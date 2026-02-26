export type BlockType =
  | "routine"
  | "focus"
  | "break"
  | "planning"
  | "social"
  | "light";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface BlockTemplate {
  id: string;
  title: string;
  type: BlockType;
  durationMinutes: number;
  defaultTasks: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyBlock {
  id: string;
  templateId: string;
  date: string;
  title: string;
  type: BlockType;
  durationMinutes: number;
  startTime: string | null;
  tasks: SubTask[];
  completed: boolean;
  sortOrder: number;
}

export interface BrainDump {
  id: string;
  text: string;
  createdAt: string;
  archived: boolean;
  archivedAt: string | null;
}

export interface FocusSession {
  id: string;
  blockId: string | null;
  durationSeconds: number;
  completedAt: string;
  date: string;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalFocusMinutes: number;
  totalBlocksCompleted: number;
  totalTasksCompleted: number;
}

export interface UserSettings {
  wakeUpTime: string;
  windDownTime: string;
  focusDurationMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  notificationsEnabled: boolean;
  hapticsEnabled: boolean;
  iCloudSyncEnabled: boolean;
}
