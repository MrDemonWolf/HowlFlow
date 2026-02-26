import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import type { BrainDump } from "@/types";

interface DumpState {
  entries: BrainDump[];
  addEntry: (text: string) => void;
  archiveEntry: (id: string) => void;
  deleteEntry: (id: string) => void;
}

export const useDumpStore = create<DumpState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (text) =>
        set((state) => ({
          entries: [
            {
              id: crypto.randomUUID(),
              text,
              createdAt: new Date().toISOString(),
              archived: false,
              archivedAt: null,
            },
            ...state.entries,
          ],
        })),
      archiveEntry: (id) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  archived: true,
                  archivedAt: new Date().toISOString(),
                }
              : entry
          ),
        })),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: "dump-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
