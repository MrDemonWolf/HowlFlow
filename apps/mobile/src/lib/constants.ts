import type { BlockTemplate, BlockType } from "@/types";

// ─── Docs URL ───────────────────────────────────────────────────────────────

const DOCS_PROD_URL = "https://mrdemonwolf.github.io/HowlFlow";

export const DOCS_URL = __DEV__ ? "http://localhost:3001" : DOCS_PROD_URL;

// ─── Block Type Config ───────────────────────────────────────────────────────

export const BLOCK_TYPE_CONFIG: Record<
  BlockType,
  { label: string; color: string; emoji: string }
> = {
  morning: { label: "Morning", color: "#FBBF24", emoji: "🌅" },
  focus: { label: "Focus", color: "#0FACED", emoji: "🎯" },
  meals: { label: "Meals", color: "#34D399", emoji: "🍽️" },
  movement: { label: "Movement", color: "#F87171", emoji: "💪" },
  chill: { label: "Chill", color: "#7C5CFC", emoji: "😌" },
  creative: { label: "Creative", color: "#F472B6", emoji: "🎨" },
  social: { label: "Social", color: "#FB923C", emoji: "👥" },
  admin: { label: "Admin", color: "#94A3B8", emoji: "📋" },
  "wind-down": { label: "Wind Down", color: "#818CF8", emoji: "🌙" },
  free: { label: "Free", color: "#64748B", emoji: "✨" },
};

// ─── Default Block Templates (12 Wolf-themed blocks) ─────────────────────────

export const DEFAULT_TEMPLATES: BlockTemplate[] = [
  {
    id: "morning-howl",
    label: "Morning Howl",
    type: "morning",
    durationMinutes: 30,
    subtasks: ["Wash face", "Get dressed", "Make bed"],
    emoji: "🌅",
  },
  {
    id: "fuel-up",
    label: "Fuel Up",
    type: "meals",
    durationMinutes: 30,
    subtasks: ["Eat breakfast", "Take vitamins", "Hydrate"],
    emoji: "🍽️",
  },
  {
    id: "hunt-1",
    label: "Hunt Block 1",
    type: "focus",
    durationMinutes: 90,
    subtasks: ["Pick top task", "Set timer", "Deep focus"],
    emoji: "🎯",
  },
  {
    id: "quick-stretch",
    label: "Quick Stretch",
    type: "movement",
    durationMinutes: 15,
    subtasks: ["Stand up", "Move around", "Breathe"],
    emoji: "💪",
  },
  {
    id: "hunt-2",
    label: "Hunt Block 2",
    type: "focus",
    durationMinutes: 90,
    subtasks: ["Review progress", "Set timer", "Deep focus"],
    emoji: "🎯",
  },
  {
    id: "refuel",
    label: "Refuel",
    type: "meals",
    durationMinutes: 45,
    subtasks: ["Prepare lunch", "Eat mindfully", "Short walk"],
    emoji: "🍽️",
  },
  {
    id: "creative-den",
    label: "Creative Den",
    type: "creative",
    durationMinutes: 60,
    subtasks: ["Choose project", "Create freely", "Save work"],
    emoji: "🎨",
  },
  {
    id: "pack-time",
    label: "Pack Time",
    type: "social",
    durationMinutes: 30,
    subtasks: ["Reach out", "Connect", "Be present"],
    emoji: "👥",
  },
  {
    id: "hunt-3",
    label: "Hunt Block 3",
    type: "focus",
    durationMinutes: 60,
    subtasks: ["Final push task", "Set timer", "Wrap up"],
    emoji: "🎯",
  },
  {
    id: "territory-check",
    label: "Territory Check",
    type: "admin",
    durationMinutes: 30,
    subtasks: ["Check messages", "Plan tomorrow", "Tidy space"],
    emoji: "📋",
  },
  {
    id: "den-chill",
    label: "Den Chill",
    type: "chill",
    durationMinutes: 60,
    subtasks: ["Relax activity", "No screens", "Enjoy"],
    emoji: "😌",
  },
  {
    id: "moonlight-wind-down",
    label: "Moonlight Wind Down",
    type: "wind-down",
    durationMinutes: 30,
    subtasks: ["Brush teeth", "Dim lights", "Reflect on wins"],
    emoji: "🌙",
  },
];

// ─── XP Constants ────────────────────────────────────────────────────────────

export const XP = {
  BLOCK_COMPLETE: 10,
  ON_TIME_BONUS: 5,
  FOCUS_SESSION: 15,
  SUBTASK: 2,
  DAILY_100_PERCENT: 50,
} as const;
