
import { ContributionDay } from "./github.service";

export interface StreakStats {
    currentStreak: number;
    longestStreak: number;
    totalThisMonth: number;
    totalThisYear: number;
    savedDays: number;
}

export class StreakService {
    calculateStreakStats(contributions: ContributionDay[]): StreakStats {
        if (!contributions || contributions.length === 0) {
            return {
                currentStreak: 0,
                longestStreak: 0,
                totalThisMonth: 0,
                totalThisYear: 0,
                savedDays: 0,
            };
        }

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        const sorted = [...contributions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        let currentStreak = 0;
        let longestStreak = 0;
        let currentRun = 0;
        let totalThisMonth = 0;
        let totalThisYear = 0;

        // Sort ascending for totals/longest streak
        const ascending = [...contributions].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        for (const day of ascending) {
            const d = new Date(day.date);
            if (d.getFullYear() === currentYear) {
                totalThisYear += day.contributionCount;
                if (d.getMonth() === currentMonth) {
                    totalThisMonth += day.contributionCount;
                }
            }
            if (day.contributionCount > 0) {
                currentRun++;
            } else {
                longestStreak = Math.max(longestStreak, currentRun);
                currentRun = 0;
            }
        }
        longestStreak = Math.max(longestStreak, currentRun);

        // Current Streak (use descending)
        const todayIST = new Date();
        const todayStr = todayIST.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

        // Find index of today
        // Note: contributions might depend on query. If query was "yesterday", today might not be there.
        // Assuming sorted contains up to today. 

        let pointer = -1;
        const todayEntry = sorted.find(d => d.date === todayStr);

        if (todayEntry && todayEntry.contributionCount > 0) {
            pointer = sorted.indexOf(todayEntry);
        } else {
            const yesterday = new Date(todayIST);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

            const yestEntry = sorted.find(d => d.date === yesterdayStr);
            if (yestEntry && yestEntry.contributionCount > 0) {
                pointer = sorted.indexOf(yestEntry);
            }
        }

        if (pointer !== -1) {
            currentStreak = 0;
            for (let i = pointer; i < sorted.length; i++) {
                // Check if dates are consecutive? 
                // sorted is DESCENDING. sorted[i] is "today or yesterday", sorted[i+1] is day before.
                // We should ensure they are actually consecutive days, but for simple logic we assume gaps = broken streak? 
                // With GitHub API, gaps usually have contributionCount: 0 but exist in array.
                // So we just iterate.
                if (sorted[i].contributionCount > 0) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }

        return {
            currentStreak,
            longestStreak,
            totalThisMonth,
            totalThisYear,
            savedDays: 0,
        };
    }
}

export const streakService = new StreakService();
