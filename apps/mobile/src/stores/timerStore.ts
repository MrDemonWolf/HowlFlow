import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";

type TimerStatus = "idle" | "running" | "paused" | "completed";

interface TimerState {
  status: TimerStatus;
  durationSeconds: number;
  remainingSeconds: number;
  currentBlockId: string | null;
  startTimer: (durationSeconds: number, blockId?: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  completeTimer: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      status: "idle",
      durationSeconds: 0,
      remainingSeconds: 0,
      currentBlockId: null,
      startTimer: (durationSeconds, blockId) =>
        set({
          status: "running",
          durationSeconds,
          remainingSeconds: durationSeconds,
          currentBlockId: blockId ?? null,
        }),
      pauseTimer: () => set({ status: "paused" }),
      resumeTimer: () => set({ status: "running" }),
      resetTimer: () =>
        set({
          status: "idle",
          durationSeconds: 0,
          remainingSeconds: 0,
          currentBlockId: null,
        }),
      tick: () =>
        set((state) => {
          if (state.remainingSeconds <= 1) {
            return { ...state, remainingSeconds: 0, status: "completed" };
          }
          return { remainingSeconds: state.remainingSeconds - 1 };
        }),
      completeTimer: () =>
        set({
          status: "idle",
          durationSeconds: 0,
          remainingSeconds: 0,
          currentBlockId: null,
        }),
    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
