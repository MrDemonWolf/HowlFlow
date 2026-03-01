import { useMemo } from "react";
import { Text, View, ScrollView } from "react-native";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { todayKey } from "@/lib/dates";
import { getLevel, getNextLevel, getLevelProgress } from "@/lib/xp";
import { useStatsStore } from "@/stores/statsStore";

function StatCard({
  label,
  value,
  emoji,
}: {
  label: string;
  value: string | number;
  emoji: string;
}) {
  return (
    <View
      className="flex-1 items-center rounded-xl bg-bg-card p-4"
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text className="mb-1 text-2xl">{emoji}</Text>
      <Text className="text-xl font-bold text-text-primary">{value}</Text>
      <Text className="text-xs text-text-secondary">{label}</Text>
    </View>
  );
}

export default function WinsScreen() {
  const totalXP = useStatsStore((s) => s.totalXP);
  const currentStreak = useStatsStore((s) => s.currentStreak);
  const longestStreak = useStatsStore((s) => s.longestStreak);
  const graceDayUsed = useStatsStore((s) => s.graceDayUsed);
  const totalBlocksCompleted = useStatsStore((s) => s.totalBlocksCompleted);
  const totalFocusSessions = useStatsStore((s) => s.totalFocusSessions);
  const totalSubtasksCompleted = useStatsStore((s) => s.totalSubtasksCompleted);
  const dailyHistory = useStatsStore((s) => s.dailyHistory);

  const today = todayKey();
  const todayStats = useMemo(
    () => dailyHistory.find((d) => d.date === today) ?? null,
    [dailyHistory, today]
  );

  const level = getLevel(totalXP);
  const nextLevel = getNextLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);

  return (
    <ScrollView
      className="flex-1"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Level badge */}
      <View className="mx-4 mt-4 items-center rounded-xl bg-bg-card p-6">
        <Text className="mb-1 text-4xl">🐺</Text>
        <Text className="text-2xl font-bold text-wolf-blue">{level.name}</Text>
        <Text className="mt-1 text-sm text-text-secondary">
          {totalXP} XP total
        </Text>
        {nextLevel && (
          <View className="mt-3 w-full">
            <ProgressBar
              value={levelProgress}
              label={`${nextLevel.minXP - totalXP} XP to ${nextLevel.name}`}
              color="#0FACED"
            />
          </View>
        )}
        {!nextLevel && (
          <Text className="mt-2 text-sm font-medium text-wolf-green">
            Max level reached!
          </Text>
        )}
      </View>

      {/* Streak */}
      <View className="mx-4 mt-4 flex-row items-center justify-center gap-4 rounded-xl bg-bg-card p-4">
        <View className="items-center">
          <Text className="text-3xl font-bold text-wolf-amber">
            {currentStreak}
          </Text>
          <Text className="text-xs text-text-secondary">Current Streak</Text>
        </View>
        <View className="h-8 w-px bg-border-default" />
        <View className="items-center">
          <Text className="text-3xl font-bold text-text-primary">
            {longestStreak}
          </Text>
          <Text className="text-xs text-text-secondary">Best Streak</Text>
        </View>
        {graceDayUsed && (
          <>
            <View className="h-8 w-px bg-border-default" />
            <View className="items-center">
              <Text className="text-lg">🛡️</Text>
              <Text className="text-xs text-text-muted">Grace used</Text>
            </View>
          </>
        )}
      </View>

      {/* Today's stats */}
      <Text className="mx-4 mb-2 mt-6 text-sm font-semibold uppercase text-text-muted">
        Today
      </Text>
      <View className="mx-4 flex-row gap-3">
        <StatCard
          emoji="📦"
          label="Blocks"
          value={todayStats?.blocksCompleted ?? 0}
        />
        <StatCard
          emoji="🎯"
          label="Focus"
          value={todayStats?.focusSessions ?? 0}
        />
        <StatCard
          emoji="✅"
          label="Subtasks"
          value={todayStats?.subtasksCompleted ?? 0}
        />
      </View>

      {/* All-time stats */}
      <Text className="mx-4 mb-2 mt-6 text-sm font-semibold uppercase text-text-muted">
        All Time
      </Text>
      <View className="mx-4 flex-row gap-3">
        <StatCard
          emoji="📦"
          label="Blocks"
          value={totalBlocksCompleted}
        />
        <StatCard
          emoji="🎯"
          label="Sessions"
          value={totalFocusSessions}
        />
        <StatCard
          emoji="✅"
          label="Subtasks"
          value={totalSubtasksCompleted}
        />
      </View>

    </ScrollView>
  );
}
