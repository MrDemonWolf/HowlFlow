import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import { getToday } from "@/lib/dates";
import type { BrainDump } from "@/types";

interface DumpState {
  entries: BrainDump[];
  addEntry: (content: string) => void;
  archiveEntry: (id: string) => void;
  deleteEntry: (id: string) => void;
  getTodaysDumps: () => BrainDump[];
  getArchivedDumps: () => BrainDump[];
}

export const useDumpStore = create<DumpState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (content) =>
        set((state) => ({
          entries: [
            {
              id: crypto.randomUUID(),
              content,
              createdAt: new Date().toISOString(),
              archived: false,
            },
            ...state.entries,
          ],
        })),

      archiveEntry: (id) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, archived: true } : entry
          ),
        })),

      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      getTodaysDumps: () => {
        const today = getToday();
        return get().entries.filter(
          (e) => !e.archived && e.createdAt.startsWith(today)
        );
      },

      getArchivedDumps: () => {
        return get().entries.filter((e) => e.archived);
      },
    }),
    {
      name: "dump-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
