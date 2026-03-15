export const DB_VERSION = 1;

export const TABLES = {
  tasks: `
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'todo',
      estimated_minutes INTEGER,
      actual_minutes INTEGER,
      due_date TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  focus_sessions: `
    CREATE TABLE IF NOT EXISTS focus_sessions (
      id TEXT PRIMARY KEY NOT NULL,
      task_id TEXT,
      type TEXT NOT NULL DEFAULT 'pomodoro',
      duration INTEGER NOT NULL,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      completed_cycles INTEGER NOT NULL DEFAULT 0,
      target_cycles INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );
  `,

  brain_dumps: `
    CREATE TABLE IF NOT EXISTS brain_dumps (
      id TEXT PRIMARY KEY NOT NULL,
      content TEXT NOT NULL,
      processed_at TEXT,
      tasks TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  routines: `
    CREATE TABLE IF NOT EXISTS routines (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      schedule TEXT NOT NULL DEFAULT 'daily',
      custom_days TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  routine_steps: `
    CREATE TABLE IF NOT EXISTS routine_steps (
      id TEXT PRIMARY KEY NOT NULL,
      routine_id TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      sort_order INTEGER NOT NULL,
      type TEXT NOT NULL DEFAULT 'task',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE
    );
  `,

  wolf_state: `
    CREATE TABLE IF NOT EXISTS wolf_state (
      id TEXT PRIMARY KEY NOT NULL DEFAULT 'singleton',
      level INTEGER NOT NULL DEFAULT 1,
      mood TEXT NOT NULL DEFAULT 'neutral',
      xp INTEGER NOT NULL DEFAULT 0,
      streak_days INTEGER NOT NULL DEFAULT 0,
      last_interaction TEXT NOT NULL,
      appearance_variant TEXT NOT NULL DEFAULT 'pup',
      appearance_accessories TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  daily_stats: `
    CREATE TABLE IF NOT EXISTS daily_stats (
      date TEXT PRIMARY KEY NOT NULL,
      focus_minutes INTEGER NOT NULL DEFAULT 0,
      tasks_completed INTEGER NOT NULL DEFAULT 0,
      tasks_skipped INTEGER NOT NULL DEFAULT 0,
      routines_completed INTEGER NOT NULL DEFAULT 0,
      streak_day INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  achievements: `
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      unlocked_at TEXT,
      progress INTEGER NOT NULL DEFAULT 0,
      target INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,

  user_preferences: `
    CREATE TABLE IF NOT EXISTS user_preferences (
      id TEXT PRIMARY KEY NOT NULL DEFAULT 'singleton',
      theme TEXT NOT NULL DEFAULT 'dark',
      notifications_enabled INTEGER NOT NULL DEFAULT 1,
      haptic_enabled INTEGER NOT NULL DEFAULT 1,
      focus_session_default INTEGER NOT NULL DEFAULT 25,
      break_duration INTEGER NOT NULL DEFAULT 5,
      daily_goal_minutes INTEGER NOT NULL DEFAULT 120,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,
} as const;
