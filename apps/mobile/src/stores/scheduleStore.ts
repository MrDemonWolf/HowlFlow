import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import type { DailyBlock, SubTask } from "@/types";

interface ScheduleState {
  dailyBlocks: DailyBlock[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setDailyBlocks: (blocks: DailyBlock[]) => void;
  toggleBlockCompleted: (blockId: string) => void;
  toggleTaskCompleted: (blockId: string, taskId: string) => void;
  addTask: (blockId: string, task: SubTask) => void;
  removeTask: (blockId: string, taskId: string) => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      dailyBlocks: [],
      selectedDate: new Date().toISOString().split("T")[0]!,
      setSelectedDate: (date) => set({ selectedDate: date }),
      setDailyBlocks: (blocks) => set({ dailyBlocks: blocks }),
      toggleBlockCompleted: (blockId) =>
        set((state) => ({
          dailyBlocks: state.dailyBlocks.map((block) =>
            block.id === blockId
              ? { ...block, completed: !block.completed }
              : block
          ),
        })),
      toggleTaskCompleted: (blockId, taskId) =>
        set((state) => ({
          dailyBlocks: state.dailyBlocks.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  tasks: block.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, completed: !task.completed }
                      : task
                  ),
                }
              : block
          ),
        })),
      addTask: (blockId, task) =>
        set((state) => ({
          dailyBlocks: state.dailyBlocks.map((block) =>
            block.id === blockId
              ? { ...block, tasks: [...block.tasks, task] }
              : block
          ),
        })),
      removeTask: (blockId, taskId) =>
        set((state) => ({
          dailyBlocks: state.dailyBlocks.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  tasks: block.tasks.filter((task) => task.id !== taskId),
                }
              : block
          ),
        })),
    }),
    {
      name: "schedule-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
