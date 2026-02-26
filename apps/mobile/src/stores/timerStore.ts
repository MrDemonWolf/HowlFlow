import { create } from "zustand";
import { useSettingsStore } from "@/stores/settingsStore";

type TimerMode = "work" | "break";

interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  running: boolean;
  sessions: number;
  linkedBlockId: string | null;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setLinkedBlock: (blockId: string | null) => void;
}

function getWorkSeconds(): number {
  return useSettingsStore.getState().pomodoroWorkMinutes * 60;
}

function getBreakSeconds(): number {
  return useSettingsStore.getState().pomodoroBreakMinutes * 60;
}

export const useTimerStore = create<TimerState>()((set, get) => ({
  mode: "work",
  timeLeft: getWorkSeconds(),
  running: false,
  sessions: 0,
  linkedBlockId: null,

  start: () => set({ running: true }),

  pause: () => set({ running: false }),

  reset: () =>
    set({
      mode: "work",
      timeLeft: getWorkSeconds(),
      running: false,
      linkedBlockId: null,
    }),

  tick: () =>
    set((state) => {
      if (!state.running || state.timeLeft <= 0) return state;

      const newTimeLeft = state.timeLeft - 1;

      if (newTimeLeft <= 0) {
        if (state.mode === "work") {
          return {
            timeLeft: getBreakSeconds(),
            mode: "break" as TimerMode,
            running: false,
            sessions: state.sessions + 1,
          };
        }
        return {
          timeLeft: getWorkSeconds(),
          mode: "work" as TimerMode,
          running: false,
        };
      }

      return { timeLeft: newTimeLeft };
    }),

  setLinkedBlock: (blockId) => set({ linkedBlockId: blockId }),
}));
