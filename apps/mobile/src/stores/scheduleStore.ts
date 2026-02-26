import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";
import { DEFAULT_BLOCK_TEMPLATES } from "@/lib/constants";
import { getToday } from "@/lib/dates";
import type { BlockTemplate, DailyBlock, SubTask } from "@/types";

interface ScheduleState {
  dailyBlocks: Record<string, DailyBlock[]>;
  templates: BlockTemplate[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  generateDailyBlocks: (date: string) => void;
  getTodaysBlocks: () => DailyBlock[];
  toggleBlock: (blockId: string) => void;
  toggleSubTask: (blockId: string, taskId: string) => void;
  addSubTask: (blockId: string, text: string) => void;
  removeTask: (blockId: string, taskId: string) => void;
  addTemplate: (
    template: Omit<BlockTemplate, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateTemplate: (id: string, updates: Partial<BlockTemplate>) => void;
  deleteTemplate: (id: string) => void;
  reorderTemplates: (templates: BlockTemplate[]) => void;
  resetTodaysBlocks: () => void;
  cleanOldData: (daysToKeep: number) => void;
}

function createInitialTemplates(): BlockTemplate[] {
  const now = new Date().toISOString();
  return DEFAULT_BLOCK_TEMPLATES.map((t) => ({
    ...t,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
}

function mapBlocksForDate(
  blocks: Record<string, DailyBlock[]>,
  date: string,
  fn: (block: DailyBlock) => DailyBlock
): Record<string, DailyBlock[]> {
  const dateBlocks = blocks[date];
  if (!dateBlocks) return blocks;
  return { ...blocks, [date]: dateBlocks.map(fn) };
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      dailyBlocks: {},
      templates: createInitialTemplates(),
      selectedDate: getToday(),

      setSelectedDate: (date) => set({ selectedDate: date }),

      getTodaysBlocks: () => {
        const state = get();
        const today = getToday();
        if (!state.dailyBlocks[today]?.length) {
          state.generateDailyBlocks(today);
        }
        return get().dailyBlocks[today] ?? [];
      },

      generateDailyBlocks: (date) => {
        const state = get();
        if (state.dailyBlocks[date]?.length) return;

        const blocks: DailyBlock[] = state.templates
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((template) => ({
            id: crypto.randomUUID(),
            templateId: template.id,
            date,
            label: template.label,
            emoji: template.emoji,
            type: template.type,
            duration: template.duration,
            time: template.time,
            tasks: template.defaultTasks.map((text) => ({
              id: crypto.randomUUID(),
              text,
              done: false,
            })),
            done: false,
            sortOrder: template.sortOrder,
          }));

        set({ dailyBlocks: { ...state.dailyBlocks, [date]: blocks } });
      },

      toggleBlock: (blockId) =>
        set((state) => {
          const date = state.selectedDate;
          const now = new Date().toISOString();
          return {
            dailyBlocks: mapBlocksForDate(
              state.dailyBlocks,
              date,
              (block) =>
                block.id === blockId
                  ? {
                      ...block,
                      done: !block.done,
                      completedAt: !block.done ? now : undefined,
                    }
                  : block
            ),
          };
        }),

      toggleSubTask: (blockId, taskId) =>
        set((state) => {
          const date = state.selectedDate;
          const now = new Date().toISOString();
          return {
            dailyBlocks: mapBlocksForDate(
              state.dailyBlocks,
              date,
              (block) => {
                if (block.id !== blockId) return block;

                const updatedTasks = block.tasks.map((task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        done: !task.done,
                        completedAt: !task.done ? now : undefined,
                      }
                    : task
                );

                // Auto-complete parent block when ALL subtasks are done
                const allDone =
                  updatedTasks.length > 0 &&
                  updatedTasks.every((t) => t.done);

                return {
                  ...block,
                  tasks: updatedTasks,
                  done: allDone ? true : block.done,
                  completedAt: allDone && !block.done ? now : block.completedAt,
                };
              }
            ),
          };
        }),

      addSubTask: (blockId, text) =>
        set((state) => {
          const date = state.selectedDate;
          const newTask: SubTask = {
            id: crypto.randomUUID(),
            text,
            done: false,
          };
          return {
            dailyBlocks: mapBlocksForDate(
              state.dailyBlocks,
              date,
              (block) =>
                block.id === blockId
                  ? { ...block, tasks: [...block.tasks, newTask] }
                  : block
            ),
          };
        }),

      removeTask: (blockId, taskId) =>
        set((state) => {
          const date = state.selectedDate;
          return {
            dailyBlocks: mapBlocksForDate(
              state.dailyBlocks,
              date,
              (block) =>
                block.id === blockId
                  ? {
                      ...block,
                      tasks: block.tasks.filter((t) => t.id !== taskId),
                    }
                  : block
            ),
          };
        }),

      addTemplate: (template) =>
        set((state) => {
          const now = new Date().toISOString();
          const newTemplate: BlockTemplate = {
            ...template,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
          };
          return { templates: [...state.templates, newTemplate] };
        }),

      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString() }
              : t
          ),
        })),

      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),

      reorderTemplates: (templates) => set({ templates }),

      resetTodaysBlocks: () =>
        set((state) => {
          const today = getToday();
          const { [today]: _, ...rest } = state.dailyBlocks;
          return { dailyBlocks: rest };
        }),

      cleanOldData: (daysToKeep) => {
        const state = get();
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysToKeep);
        const cutoffStr = cutoff.toISOString().split("T")[0]!;

        const cleaned: Record<string, DailyBlock[]> = {};
        for (const [date, blocks] of Object.entries(state.dailyBlocks)) {
          if (date >= cutoffStr) {
            cleaned[date] = blocks;
          }
        }
        set({ dailyBlocks: cleaned });
      },
    }),
    {
      name: "schedule-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
