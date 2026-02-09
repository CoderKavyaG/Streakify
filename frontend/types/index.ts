export type User = {
  id: string;
  github_id?: string;
  github_username?: string;
  github_access_token?: string;
  avatar_url?: string;
  email?: string;
  telegram_chat_id?: string;
  check_time?: string;
  timezone?: string;
  created_at?: string;
  updated_at?: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setCheckingAuth: (checking: boolean) => void;
  setLoading: (loading: boolean) => void;
};

export type GithubStatus = {
  hasToken: boolean;
  isValid: boolean;
  message: string;
};

export type UserStore = {
  user: User | null;
  hasGithubToken: boolean;
  loading: boolean;
  updatingSettings: boolean;
  updatingGithubToken: boolean;
  error: string | null;
  githubStatus: GithubStatus | null;
  fetchUser: () => Promise<void>;
  updateSettings: (
    settings: Partial<Pick<User, "check_time" | "timezone">>,
  ) => Promise<void>;
  linkTelegram: (telegram_chat_id: string) => Promise<void>;
  fetchGithubStatus: () => Promise<void>;
  updateGithubToken: (github_access_token: string) => Promise<void>;
};

export type Contribution = {
  date: string;
  contributionCount: number;
};

export type StreakStats = {
  currentStreak: number;
  longestStreak: number;
  savedDays: number;

  totalThisMonth: number;
  totalThisYear: number;
};

export type ContributionsStore = {
  contributions: Contribution[];
  total: number;
  todayStatus: { date: string; hasContributed: boolean } | null;
  streakStats: StreakStats | null;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  fetchContributions: () => Promise<void>;
  fetchTodayStatus: () => Promise<void>;
  fetchStreakStats: () => Promise<void>;
  syncContributions: () => Promise<void>;
};

export type NotificationLog = {
  id: string;
  user_id: string;
  type: string; // "email" | "telegram"
  date: string;
  sent_at?: string;
};

export type NotificationsStore = {
  notificationHistory: NotificationLog[];
  loading: boolean;
  sendingTestTelegramMessage: boolean;
  sendingEmail: boolean;
  error: string | null;
  testEmailResult: string | null;
  reminderResult: string | null;
  telegramResult: string | null;
  sendTestEmail: (email: string) => Promise<void>;
  sendReminder: (type?: "friendly" | "urgent") => Promise<void>;
  sendTelegramTest: (message?: string) => Promise<void>;
  fetchNotificationHistory: () => Promise<void>;
};

export type LinkCodeInfo = {
  code: string;
  expiresIn: string;
  instructions: string;
  botUsername?: string;
};

export type WebhookInfo = {
  url: string;
  has_custom_certificate?: boolean;
  pending_update_count?: number;
  last_error_date?: number;
  last_error_message?: string;
  max_connections?: number;
};

export type TelegramStore = {
  linkCodeInfo: LinkCodeInfo | null;
  webhookInfo: WebhookInfo | null;
  loading: boolean;
  error: string | null;
  generateLinkCode: () => Promise<void>;
  setWebhook: (url: string) => Promise<void>;
  fetchWebhookInfo: () => Promise<void>;
};
