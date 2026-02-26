import type { BlockTemplate, BlockType, UserSettings } from "@/types";

export const DEFAULT_BLOCK_TEMPLATES: Omit<
  BlockTemplate,
  "id" | "createdAt" | "updatedAt"
>[] = [
  {
    label: "Morning Pack Ritual",
    emoji: "\u2600\uFE0F",
    type: "routine",
    duration: 30,
    time: "08:00",
    defaultTasks: ["Brush teeth", "Shower", "Get dressed"],
    sortOrder: 0,
  },
  {
    label: "Hunt Planning",
    emoji: "\uD83D\uDCCB",
    type: "planning",
    duration: 15,
    time: "08:30",
    defaultTasks: ["Review today's blocks", "Set top 3 priorities"],
    sortOrder: 1,
  },
  {
    label: "Deep Hunt",
    emoji: "\uD83C\uDFAF",
    type: "focus",
    duration: 90,
    time: "09:00",
    defaultTasks: ["Work on main task"],
    sortOrder: 2,
  },
  {
    label: "Water Hole Break",
    emoji: "\uD83D\uDCA7",
    type: "break",
    duration: 15,
    time: "10:30",
    defaultTasks: ["Stretch", "Drink water"],
    sortOrder: 3,
  },
  {
    label: "Second Hunt",
    emoji: "\u26A1",
    type: "focus",
    duration: 60,
    time: "10:45",
    defaultTasks: ["Continue main task"],
    sortOrder: 4,
  },
  {
    label: "Pack Check-in",
    emoji: "\uD83D\uDCAC",
    type: "social",
    duration: 15,
    time: "11:45",
    defaultTasks: ["Reply to messages", "Quick social check"],
    sortOrder: 5,
  },
  {
    label: "Feeding Time",
    emoji: "\uD83C\uDF56",
    type: "break",
    duration: 45,
    time: "12:00",
    defaultTasks: ["Eat lunch", "Step outside"],
    sortOrder: 6,
  },
  {
    label: "Gentle Patrol",
    emoji: "\uD83D\uDC3E",
    type: "light",
    duration: 45,
    time: "12:45",
    defaultTasks: ["Emails", "Messages", "Quick tasks"],
    sortOrder: 7,
  },
  {
    label: "Afternoon Hunt",
    emoji: "\uD83D\uDD25",
    type: "focus",
    duration: 90,
    time: "13:30",
    defaultTasks: ["Afternoon focus work"],
    sortOrder: 8,
  },
  {
    label: "Den Rest",
    emoji: "\uD83D\uDECB\uFE0F",
    type: "break",
    duration: 20,
    time: "15:00",
    defaultTasks: ["Relax", "Stretch"],
    sortOrder: 9,
  },
  {
    label: "Final Hunt",
    emoji: "\uD83C\uDF19",
    type: "focus",
    duration: 60,
    time: "15:20",
    defaultTasks: ["Wrap up tasks"],
    sortOrder: 10,
  },
  {
    label: "Evening Howl",
    emoji: "\uD83C\uDF05",
    type: "routine",
    duration: 30,
    time: "16:20",
    defaultTasks: ["Tidy space", "Prepare for tomorrow"],
    sortOrder: 11,
  },
];

export const WOLF_QUOTES = [
  "The strength of the pack is the wolf, and the strength of the wolf is the pack. You've got this.",
  "Every howl starts with a single breath. Take yours now.",
  "Wolves don't lose sleep over the opinions of sheep. Stay on your trail.",
  "A wolf doesn't perform for the circus. Do what matters to you.",
  "Even the alpha rests between hunts. Breaks are part of the strategy.",
  "The moon doesn't rush the night. Neither should you.",
  "Trust your instincts. You know the way through the forest.",
  "The hunt is long, but your pack is with you.",
  "Paws forward. One step, one task, one block at a time.",
  "You are not behind. You are exactly where your trail leads.",
];

export const COMPLETION_MESSAGES: Record<number, string> = {
  100: "LEGENDARY WOLF STATUS! You completed every block. The whole forest heard that howl. Rest well tonight, champion.",
  70: "Alpha wolf energy! You crushed most of your day. The pack is proud of this hunt.",
  40: "Solid hunt today! Every completed block is a win. You showed up and that matters.",
  1: "You showed up and started. That takes more strength than most realize. Every step counts.",
  0: "The hunt hasn't started yet, and that's okay. Tomorrow's trail is waiting. Rest up, wolf.",
};

export const BLOCK_TYPE_CONFIG: Record<
  BlockType,
  { bg: string; border: string; label: string }
> = {
  routine: { bg: "rgba(12,172,237,0.15)", border: "#0FACED", label: "Routine" },
  focus: { bg: "rgba(252,129,74,0.15)", border: "#fc814a", label: "Focus" },
  break: { bg: "rgba(104,211,145,0.15)", border: "#68d391", label: "Break" },
  planning: {
    bg: "rgba(183,148,244,0.15)",
    border: "#b794f4",
    label: "Planning",
  },
  social: { bg: "rgba(246,224,94,0.15)", border: "#f6e05e", label: "Social" },
  light: { bg: "rgba(148,163,200,0.15)", border: "#94A3C8", label: "Light" },
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  wakeUpTime: "08:00",
  windDownTime: "22:00",
  pomodoroWorkMinutes: 25,
  pomodoroBreakMinutes: 5,
  notifyMinutesBefore: 5,
  morningReminderTime: "07:45",
  notificationsEnabled: true,
  hapticsEnabled: true,
  iCloudSyncEnabled: false,
  wolfQuotesEnabled: true,
};
