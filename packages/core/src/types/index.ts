export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4;
  status: "todo" | "in_progress" | "done" | "skipped";
  estimatedMinutes?: number;
  actualMinutes?: number;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  type: "pomodoro" | "deep" | "sprint";
  duration: number;
  startedAt: string;
  endedAt?: string;
  completedCycles: number;
  targetCycles: number;
  status: "active" | "paused" | "completed" | "abandoned";
}

export interface BrainDump {
  id: string;
  content: string;
  processedAt?: string;
  tasks: string[];
  createdAt: string;
}

export interface RoutineStep {
  id: string;
  routineId: string;
  title: string;
  duration: number;
  order: number;
  type: "task" | "timer" | "break" | "prompt";
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  steps: RoutineStep[];
  schedule: "daily" | "weekday" | "weekend" | "custom";
  customDays?: number[];
  isActive: boolean;
  createdAt: string;
}

export interface WolfAppearance {
  variant: "pup" | "young" | "adult" | "elder";
  accessories: string[];
}

export interface WolfState {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  mood: "happy" | "neutral" | "tired" | "sleeping";
  xp: number;
  streakDays: number;
  lastInteraction: string;
  appearance: WolfAppearance;
}

export interface DailyStats {
  date: string;
  focusMinutes: number;
  tasksCompleted: number;
  tasksSkipped: number;
  routinesCompleted: number;
  streakDay: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface UserPreferences {
  id: string;
  theme: "dark";
  notificationsEnabled: boolean;
  hapticEnabled: boolean;
  focusSessionDefault: number;
  breakDuration: number;
  dailyGoalMinutes: number;
}
