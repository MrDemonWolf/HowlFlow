import type { BlockTemplate, UserSettings } from "@/types";

export const DEFAULT_BLOCK_TEMPLATES: Omit<
  BlockTemplate,
  "id" | "createdAt" | "updatedAt"
>[] = [
  {
    title: "Morning Howl",
    type: "routine",
    durationMinutes: 30,
    defaultTasks: ["Brush teeth", "Shower", "Get dressed"],
    sortOrder: 0,
  },
  {
    title: "Sunrise Fuel",
    type: "routine",
    durationMinutes: 20,
    defaultTasks: ["Prepare breakfast", "Eat mindfully"],
    sortOrder: 1,
  },
  {
    title: "Trail Planning",
    type: "planning",
    durationMinutes: 15,
    defaultTasks: ["Review today's blocks", "Set top 3 priorities"],
    sortOrder: 2,
  },
  {
    title: "Deep Hunt I",
    type: "focus",
    durationMinutes: 50,
    defaultTasks: ["Work on main task"],
    sortOrder: 3,
  },
  {
    title: "Water Break",
    type: "break",
    durationMinutes: 10,
    defaultTasks: ["Stretch", "Drink water"],
    sortOrder: 4,
  },
  {
    title: "Deep Hunt II",
    type: "focus",
    durationMinutes: 50,
    defaultTasks: ["Continue main task"],
    sortOrder: 5,
  },
  {
    title: "Pack Lunch",
    type: "break",
    durationMinutes: 30,
    defaultTasks: ["Eat lunch", "Step outside"],
    sortOrder: 6,
  },
  {
    title: "Light Patrol",
    type: "light",
    durationMinutes: 30,
    defaultTasks: ["Emails", "Messages", "Quick tasks"],
    sortOrder: 7,
  },
  {
    title: "Deep Hunt III",
    type: "focus",
    durationMinutes: 50,
    defaultTasks: ["Afternoon focus work"],
    sortOrder: 8,
  },
  {
    title: "Pack Social",
    type: "social",
    durationMinutes: 30,
    defaultTasks: ["Catch up with a friend", "Social media check-in"],
    sortOrder: 9,
  },
  {
    title: "Evening Wind Down",
    type: "routine",
    durationMinutes: 30,
    defaultTasks: ["Tidy space", "Prepare for tomorrow"],
    sortOrder: 10,
  },
  {
    title: "Den Rest",
    type: "break",
    durationMinutes: 60,
    defaultTasks: ["Relax", "Read or watch something"],
    sortOrder: 11,
  },
];

export const WOLF_QUOTES = [
  "The strength of the pack is the wolf. You've got this.",
  "Every howl starts with a breath. Take yours.",
  "Wolves don't lose sleep over the opinion of sheep. Focus on your trail.",
  "The pack moves at the pace of the slowest wolf. Be kind to yourself.",
  "A wolf doesn't concern itself with yesterday's hunt.",
  "Trust your instincts. You know the way.",
  "Even lone wolves rest. Take your break.",
  "The hunt is long, but your stamina is real.",
  "Paws forward. One step at a time.",
  "The moon doesn't rush the night. Neither should you.",
];

export const COMPLETION_MESSAGES = [
  { threshold: 0.2, message: "The trail has just begun. Keep moving." },
  { threshold: 0.4, message: "Nice pace! The pack is proud." },
  { threshold: 0.6, message: "Past the halfway mark. Strong wolf energy." },
  { threshold: 0.8, message: "Almost there! The den is in sight." },
  { threshold: 1.0, message: "Full howl! You crushed it today!" },
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  wakeUpTime: "07:00",
  windDownTime: "22:00",
  focusDurationMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  notificationsEnabled: true,
  hapticsEnabled: true,
  iCloudSyncEnabled: false,
};
