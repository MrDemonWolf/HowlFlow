// ─── Settings ────────────────────────────────────────────────────────────────

export type ThemePreference = "dark" | "light" | "auto";

export interface Settings {
  // Schedule
  wakeUpTime: string; // HH:mm
  windDownTime: string; // HH:mm

  // Timer
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;

  // Notifications
  notificationsEnabled: boolean;
  timerAlertsEnabled: boolean;
  morningReminderTime: string; // HH:mm

  // Appearance
  themePreference: ThemePreference;
  hapticsEnabled: boolean;

  // Data
  iCloudSyncEnabled: boolean;

  // Onboarding
  onboardingCompleted: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  wakeUpTime: "07:00",
  windDownTime: "21:00",
  workMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  notificationsEnabled: true,
  timerAlertsEnabled: true,
  morningReminderTime: "07:30",
  themePreference: "dark",
  hapticsEnabled: true,
  iCloudSyncEnabled: false,
  onboardingCompleted: false,
};

// ─── Schedule ────────────────────────────────────────────────────────────────

export type BlockType =
  | "morning"
  | "focus"
  | "meals"
  | "movement"
  | "chill"
  | "creative"
  | "social"
  | "admin"
  | "wind-down"
  | "free";

export interface SubTask {
  id: string;
  label: string;
  done: boolean;
}

export interface BlockTemplate {
  id: string;
  label: string;
  type: BlockType;
  durationMinutes: number;
  subtasks: string[]; // default subtask labels
  emoji: string;
}

export interface DailyBlock {
  id: string;
  templateId: string;
  date: string; // YYYY-MM-DD
  label: string;
  type: BlockType;
  emoji: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  subtasks: SubTask[];
  done: boolean;
  completedAt?: string; // ISO string
}

// ─── Timer ───────────────────────────────────────────────────────────────────

export type TimerMode = "work" | "break" | "longBreak";

export interface TimerState {
  mode: TimerMode;
  sessionsCompleted: number;
  linkedBlockId: string | null;
  // NOT persisted:
  isRunning: boolean;
  timeLeft: number; // seconds
}

// ─── Brain Dump ──────────────────────────────────────────────────────────────

export interface DumpEntry {
  id: string;
  text: string;
  createdAt: string; // ISO string
  archived: boolean;
}

// ─── Stats / XP ──────────────────────────────────────────────────────────────

export interface WolfLevel {
  name: string;
  minXP: number;
}

export const WOLF_LEVELS: WolfLevel[] = [
  { name: "Pup", minXP: 0 },
  { name: "Scout", minXP: 100 },
  { name: "Tracker", minXP: 300 },
  { name: "Hunter", minXP: 600 },
  { name: "Howler", minXP: 1000 },
  { name: "Alpha", minXP: 1500 },
  { name: "Pack Leader", minXP: 2500 },
  { name: "Lone Wolf Legend", minXP: 4000 },
];

export interface DailyStats {
  date: string; // YYYY-MM-DD
  blocksCompleted: number;
  totalBlocks: number;
  focusSessions: number;
  subtasksCompleted: number;
  xpEarned: number;
}

export interface UserStats {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  graceDayUsed: boolean; // streak grace
  totalBlocksCompleted: number;
  totalFocusSessions: number;
  totalSubtasksCompleted: number;
  dailyHistory: DailyStats[];
}

export const DEFAULT_STATS: UserStats = {
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  graceDayUsed: false,
  totalBlocksCompleted: 0,
  totalFocusSessions: 0,
  totalSubtasksCompleted: 0,
  dailyHistory: [],
};
