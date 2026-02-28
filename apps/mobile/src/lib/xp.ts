import { WOLF_LEVELS } from "@/types";
import type { WolfLevel } from "@/types";
import { XP } from "./constants";

/**
 * Get the current wolf level for a given XP amount.
 */
export function getLevel(totalXP: number): WolfLevel {
  let current = WOLF_LEVELS[0];
  for (const level of WOLF_LEVELS) {
    if (totalXP >= level.minXP) {
      current = level;
    } else {
      break;
    }
  }
  return current;
}

/**
 * Get the next wolf level (or null if max).
 */
export function getNextLevel(totalXP: number): WolfLevel | null {
  for (const level of WOLF_LEVELS) {
    if (totalXP < level.minXP) {
      return level;
    }
  }
  return null;
}

/**
 * Get XP progress toward next level as 0–1.
 */
export function getLevelProgress(totalXP: number): number {
  const current = getLevel(totalXP);
  const next = getNextLevel(totalXP);
  if (!next) return 1; // max level
  const range = next.minXP - current.minXP;
  const progress = totalXP - current.minXP;
  return progress / range;
}

/**
 * Calculate XP earned for completing a block.
 */
export function blockCompleteXP(onTime: boolean): number {
  return XP.BLOCK_COMPLETE + (onTime ? XP.ON_TIME_BONUS : 0);
}

/**
 * Calculate XP earned for a focus session.
 */
export function focusSessionXP(): number {
  return XP.FOCUS_SESSION;
}

/**
 * Calculate XP earned for completing a subtask.
 */
export function subtaskXP(): number {
  return XP.SUBTASK;
}

/**
 * Calculate XP bonus for 100% daily completion.
 */
export function dailyBonusXP(): number {
  return XP.DAILY_100_PERCENT;
}
