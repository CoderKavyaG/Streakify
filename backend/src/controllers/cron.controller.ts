
import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { githubService } from '../services/github.service';
import { emailService } from '../services/email.service';
import { telegramService } from '../services/telegram.service';
import { streakService } from '../services/streak_v2.service';

// Use a simple map for in-memory caching of notifications sent in the current runtime
// Note: This won't persist across serverless function invocations but helps during local dev/testing
const notifiedInRuntime = new Map<string, string>();

/**
 * Validates the cron secret from various possible sources:
 * 1. X-Cron-Secret header
 * 2. Authorization: Bearer <secret> header
 * 3. ?secret=<secret> query parameter
 */
const checkCronAuth = (req: Request): boolean => {
  const secret = (req.headers['x-cron-secret'] as string) ||
    (req.headers.authorization?.replace('Bearer ', '')) ||
    (req.query.secret as string);

  const expectedSecret = process.env.CRON_SECRET || process.env.CRON_JOB_SECRET;

  if (!expectedSecret) {
    console.warn('⚠️ CRON_SECRET not set in environment variables');
    return process.env.NODE_ENV !== 'production'; // Allow in dev, block in prod if no secret
  }

  return secret === expectedSecret;
};

/**
 * HOURLY CHECK
 * Triggered by GitHub Actions or Vercel Cron.
 * Checks users who have scheduled their reminder for the current time.
 */
export const handleHourly = async (req: Request, res: Response) => {
  if (!checkCronAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  const formattedTime = currentTime.length === 5 ? currentTime : `0${currentTime}`;
  console.log(`⏰ Cron Trigger: Hourly Check at ${formattedTime} IST`);

  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('check_time', formattedTime);

    if (error) throw error;
    if (!users?.length) {
      return res.json({ message: `No users scheduled for ${formattedTime}`, processed: 0 });
    }

    console.log(`🔔 Checking ${users.length} users for ${formattedTime}`);
    let notifiedCount = 0;
    const results = [];

    for (const user of users) {
      try {
        const timezone = user.timezone || 'Asia/Kolkata';
        const todayKolkata = new Date().toLocaleDateString("en-CA", { timeZone: 'Asia/Kolkata' });

        // Check DB logs to avoid duplicate notifications today
        const { data: existingLogs } = await supabaseAdmin
          .from('notifications_log')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', todayKolkata);

        if (existingLogs && existingLogs.length > 0) {
          results.push({ user: user.github_username, status: 'Already notified today' });
          continue;
        }

        const contributed = await githubService.hasContributedToday(
          user.github_username,
          user.github_access_token,
          timezone
        );

        if (!contributed) {
          const contributions = await githubService.getContributions(user.github_username, user.github_access_token);
          const stats = streakService.calculateStreakStats(contributions);

          // Send Email
          if (user.email) {
            await emailService.sendStreakReminder({
              to: user.email,
              username: user.github_username,
              currentStreak: stats.currentStreak,
              type: 'friendly'
            });
          }

          // Send Telegram
          if (user.telegram_chat_id) {
            await telegramService.sendMessage(
              user.telegram_chat_id,
              `⚠️ Hey ${user.github_username}!\n\nYou haven't contributed today.\n\n🔥 Streak: ${stats.currentStreak} days\n\nMake a commit now!`
            );
          }

          // Log notification
          await supabaseAdmin.from('notifications_log').insert({
            user_id: user.id,
            type: user.telegram_chat_id ? 'telegram' : 'email',
            date: todayKolkata
          });

          notifiedCount++;
          results.push({ user: user.github_username, status: 'Reminded' });
        } else {
          results.push({ user: user.github_username, status: 'Contributed' });
        }
      } catch (err: any) {
        console.error(`Error processing user ${user.github_username}:`, err);
        results.push({ user: user.github_username, error: err.message });
      }
    }

    return res.json({
      success: true,
      message: `Processed ${results.length} users`,
      notified: notifiedCount,
      details: results
    });
  } catch (err: any) {
    console.error('Hourly check error:', err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * URGENT CHECK
 * Triggered at 11 PM IST.
 * Sends a final reminder to all users who haven't contributed.
 */
export const handleUrgent = async (req: Request, res: Response) => {
  if (!checkCronAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('🚨 Cron Trigger: Urgent Requirement Check (11 PM IST)');

  try {
    const { data: users } = await supabaseAdmin.from('users').select('*');
    if (!users?.length) return res.json({ message: 'No users found', notified: 0 });

    let notifiedCount = 0;
    const todayKolkata = new Date().toLocaleDateString("en-CA", { timeZone: 'Asia/Kolkata' });

    for (const user of users) {
      if (!user.telegram_chat_id) continue;

      try {
        const timezone = user.timezone || 'Asia/Kolkata';
        const contributed = await githubService.hasContributedToday(
          user.github_username,
          user.github_access_token,
          timezone
        );

        if (!contributed) {
          const contributions = await githubService.getContributions(user.github_username, user.github_access_token);
          const stats = streakService.calculateStreakStats(contributions);

          await telegramService.sendMessage(
            user.telegram_chat_id,
            `1 hr to day end! Do commit the stuff ⏰\n\n${user.github_username}, your ${stats.currentStreak}-day streak is about to break!`
          );

          await supabaseAdmin.from('notifications_log').insert({
            user_id: user.id,
            type: 'telegram',
            date: todayKolkata
          });

          notifiedCount++;
        }
      } catch (err: any) {
        console.error(`Error in urgent check for ${user.github_username}:`, err);
      }
    }

    return res.json({ success: true, notified: notifiedCount });
  } catch (err: any) {
    console.error('Urgent check error:', err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * MIDNIGHT SYNC
 * Syncs performance data and sends "Streak Saved" messages.
 */
export const handleSync = async (req: Request, res: Response) => {
  if (!checkCronAuth(req)) return res.status(401).json({ error: 'Unauthorized' });

  console.log('🌙 Cron Trigger: Midnight Sync');

  try {
    const { data: users } = await supabaseAdmin.from('users').select('*');
    if (!users?.length) return res.json({ message: 'No users' });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("en-CA", { timeZone: 'Asia/Kolkata' });

    for (const user of users) {
      try {
        const contributions = await githubService.getContributions(user.github_username, user.github_access_token);

        // Sync contributions
        for (const day of contributions.slice(-7)) {
          await supabaseAdmin.from('contributions').upsert({
            user_id: user.id,
            date: day.date,
            count: day.contributionCount
          }, { onConflict: 'user_id,date' });
        }

        // Check if streak was saved (reminded yesterday and contributed)
        const { data: yesterdayLogs } = await supabaseAdmin
          .from('notifications_log')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', yesterdayStr);

        const yesterdayContributed = contributions.find(c => c.date === yesterdayStr)?.contributionCount || 0;

        if (yesterdayLogs?.length && yesterdayContributed > 0) {
          const stats = streakService.calculateStreakStats(contributions);
          if (user.telegram_chat_id) {
            await telegramService.sendMessage(
              user.telegram_chat_id,
              `🎉 Streak Saved!\n\nGreat job ${user.github_username}!\n\n🔥 Streak: ${stats.currentStreak} days\n\nKeep going! 💪`
            );
          }
        }
      } catch (err) {
        console.error(`Sync error for ${user.github_username}:`, err);
      }
    }
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * CLEANUP
 */
export const handleCleanup = async (req: Request, res: Response) => {
  if (!checkCronAuth(req)) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await supabaseAdmin.from('telegram_link_codes').delete().lt('expires_at', new Date().toISOString());
    return res.json({ success: true, message: 'Cleaned up expired codes' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

