import { useEffect } from "react";

import { todayKey } from "@/lib/dates";
import { useScheduleStore } from "@/stores/scheduleStore";

export function useWidgetSync() {
  const blocks = useScheduleStore((s) => s.blocks);

  useEffect(() => {
    const today = todayKey();
    const todayBlocks = blocks.filter((b) => b.date === today);
    const totalBlocks = todayBlocks.length;
    const blocksCompleted = todayBlocks.filter((b) => b.done).length;
    const progressPercent = totalBlocks > 0 ? blocksCompleted / totalBlocks : 0;

    const nextBlock = todayBlocks.find((b) => !b.done);

    try {
      const { getScheduleWidget } = require("@/widgets/ScheduleWidget");
      getScheduleWidget().updateSnapshot({
        blocksCompleted,
        totalBlocks,
        progressPercent,
        nextBlockLabel: nextBlock?.label ?? "All done!",
        nextBlockTime: nextBlock ? `${nextBlock.startTime} – ${nextBlock.endTime}` : "",
        nextBlockEmoji: nextBlock?.emoji ?? "🎉",
      });
    } catch {
      // Native module not available before prebuild
    }
  }, [blocks]);
}
