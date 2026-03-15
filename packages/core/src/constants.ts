import type { FocusSession } from "./types";

export const TIMER_PRESETS: {
  name: string;
  minutes: number;
  type: FocusSession["type"];
}[] = [
  { name: "Pomodoro", minutes: 25, type: "pomodoro" },
  { name: "Deep Work", minutes: 50, type: "deep" },
  { name: "Sprint", minutes: 15, type: "sprint" },
  { name: "Quick", minutes: 10, type: "sprint" },
];

export const WOLF_MESSAGES = {
  encouragement: [
    "Awoo! You've got this, pack leader!",
    "The pack believes in you — keep going!",
    "Every howl starts with a deep breath. Focus up!",
    "Wolves don't quit. Neither do you.",
  ],
  completion: [
    "Howl yeah! Another task conquered!",
    "The pack howls in celebration!",
    "You're on fire — even the moon is impressed!",
    "Mission complete. Time for a well-earned rest.",
  ],
  streak: [
    "Day after day, the wolf runs strong!",
    "Your streak is legendary — the pack is proud!",
    "Consistency is the mark of a true alpha!",
    "The lone wolf has become the streak wolf!",
  ],
} as const;

export const ROUTINE_TEMPLATES = [
  {
    name: "Morning Startup",
    steps: [
      { title: "Review today's tasks", duration: 5, order: 1, type: "task" as const },
      { title: "Set top 3 priorities", duration: 5, order: 2, type: "prompt" as const },
      { title: "First focus session", duration: 25, order: 3, type: "timer" as const },
      { title: "Quick break", duration: 5, order: 4, type: "break" as const },
    ],
  },
  {
    name: "Wind Down",
    steps: [
      { title: "Review completed tasks", duration: 5, order: 1, type: "task" as const },
      { title: "Brain dump tomorrow's thoughts", duration: 10, order: 2, type: "prompt" as const },
      { title: "Clear inbox", duration: 10, order: 3, type: "task" as const },
      { title: "Reflect & relax", duration: 5, order: 4, type: "break" as const },
    ],
  },
] as const;
