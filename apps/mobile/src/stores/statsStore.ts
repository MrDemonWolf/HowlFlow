import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import type { UserStats, FocusSession } from "@/types";

interface StatsState extends UserStats {
  focusSessions: FocusSession[];
  recordFocusSession: (minutes: number) => void;
  recordBlockCompletion: () => void;
  updateStreak: (blocksCompleted: number, blocksTotal: number) => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      totalFocusMinutes: 0,
      totalBlocksCompleted: 0,
      focusSessions: [],

      recordFocusSession: (minutes) =>
        set((state) => ({
          totalFocusMinutes: state.totalFocusMinutes + minutes,
        })),

      recordBlockCompletion: () =>
        set((state) => ({
          totalBlocksCompleted: state.totalBlocksCompleted + 1,
        })),

      updateStreak: (blocksCompleted, blocksTotal) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0]!;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0]!;

          const isSameDay = state.lastActiveDate === today;
          if (isSameDay) return state;

          // Streak increments if >50% done
          const percentage =
            blocksTotal > 0 ? blocksCompleted / blocksTotal : 0;
          if (percentage <= 0.5) return state;

          const isConsecutive = state.lastActiveDate === yesterdayStr;
          const newStreak = isConsecutive ? state.currentStreak + 1 : 1;

          return {
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
            lastActiveDate: today,
          };
        }),
    }),
    {
      name: "stats-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
