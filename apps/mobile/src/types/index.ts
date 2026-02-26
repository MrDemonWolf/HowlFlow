export type BlockType =
  | "routine"
  | "focus"
  | "break"
  | "planning"
  | "social"
  | "light";

export interface SubTask {
  id: string;
  text: string;
  done: boolean;
  completedAt?: string;
}

export interface BlockTemplate {
  id: string;
  label: string;
  emoji: string;
  type: BlockType;
  duration: number;
  time: string;
  defaultTasks: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyBlock {
  id: string;
  templateId: string;
  date: string;
  label: string;
  emoji: string;
  type: BlockType;
  duration: number;
  time: string | null;
  tasks: SubTask[];
  done: boolean;
  completedAt?: string;
  sortOrder: number;
}

export interface BrainDump {
  id: string;
  content: string;
  createdAt: string;
  archived: boolean;
}

export interface FocusSession {
  id: string;
  blockId?: string;
  durationSeconds: number;
  completed: boolean;
  startedAt: string;
  endedAt?: string;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalFocusMinutes: number;
  totalBlocksCompleted: number;
}

export interface UserSettings {
  wakeUpTime: string;
  windDownTime: string;
  pomodoroWorkMinutes: number;
  pomodoroBreakMinutes: number;
  notifyMinutesBefore: number;
  morningReminderTime: string;
  notificationsEnabled: boolean;
  hapticsEnabled: boolean;
  iCloudSyncEnabled: boolean;
  wolfQuotesEnabled: boolean;
}
