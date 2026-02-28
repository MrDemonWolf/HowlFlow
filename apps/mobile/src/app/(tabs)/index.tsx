import { Stack, router } from "expo-router";
import { useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import { QuoteBar } from "@/components/schedule/QuoteBar";
import { TimeBlockCard } from "@/components/schedule/TimeBlockCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { todayKey } from "@/lib/dates";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useSettingsStore } from "@/stores/settingsStore";
import type { DailyBlock } from "@/types";

export default function ScheduleScreen() {
  const wakeUpTime = useSettingsStore((s) => s.settings.wakeUpTime);
  const generateDailyBlocks = useScheduleStore((s) => s.generateDailyBlocks);
  const blocks = useScheduleStore((s) => s.blocks);

  useEffect(() => {
    generateDailyBlocks(wakeUpTime);
  }, [wakeUpTime, generateDailyBlocks]);

  const today = todayKey();
  const todayBlocks = useMemo(
    () => blocks.filter((b) => b.date === today),
    [blocks, today]
  );

  const progress = useMemo(() => {
    const total = todayBlocks.length;
    const completed = todayBlocks.filter((b) => b.done).length;
    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [todayBlocks]);

  const renderBlock = ({ item }: { item: DailyBlock }) => (
    <TimeBlockCard block={item} />
  );

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="gearshape"
          onPress={() => router.push("/settings")}
        />
      </Stack.Toolbar>
      <FlatList
        data={todayBlocks}
        keyExtractor={(item) => item.id}
        renderItem={renderBlock}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <View>
            {/* Daily progress */}
            <View className="mx-4 mb-4 mt-2">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm font-medium text-text-primary">
                  Today's Progress
                </Text>
                <Text className="text-sm text-wolf-blue">
                  {progress.completed}/{progress.total} blocks
                </Text>
              </View>
              <ProgressBar
                value={progress.percent / 100}
                label={`${progress.percent}% of daily blocks completed`}
                color={progress.percent === 100 ? "#34D399" : "#0FACED"}
              />
              {progress.percent === 100 && progress.total > 0 && (
                <Text className="mt-2 text-center text-sm font-bold text-wolf-green">
                  🎉 All blocks complete! Great work, wolf!
                </Text>
              )}
            </View>

            <QuoteBar />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🐺"
            title="No blocks yet"
            subtitle="Your schedule is generating..."
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
