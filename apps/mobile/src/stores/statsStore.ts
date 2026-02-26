import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import type { UserStats, FocusSession } from "@/types";

interface StatsState extends UserStats {
  focusSessions: FocusSession[];
  addFocusSession: (session: FocusSession) => void;
  incrementBlocksCompleted: () => void;
  incrementTasksCompleted: () => void;
  updateStreak: (date: string) => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      totalFocusMinutes: 0,
      totalBlocksCompleted: 0,
      totalTasksCompleted: 0,
      focusSessions: [],
      addFocusSession: (session) =>
        set((state) => ({
          focusSessions: [...state.focusSessions, session],
          totalFocusMinutes:
            state.totalFocusMinutes + Math.round(session.durationSeconds / 60),
        })),
      incrementBlocksCompleted: () =>
        set((state) => ({
          totalBlocksCompleted: state.totalBlocksCompleted + 1,
        })),
      incrementTasksCompleted: () =>
        set((state) => ({
          totalTasksCompleted: state.totalTasksCompleted + 1,
        })),
      updateStreak: (date) =>
        set((state) => {
          const yesterday = new Date(date);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0]!;

          const isConsecutive = state.lastActiveDate === yesterdayStr;
          const isSameDay = state.lastActiveDate === date;

          if (isSameDay) return state;

          const newStreak = isConsecutive ? state.currentStreak + 1 : 1;
          return {
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
            lastActiveDate: date,
          };
        }),
    }),
    {
      name: "stats-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
