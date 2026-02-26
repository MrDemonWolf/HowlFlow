import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useStatsStore } from "@/stores/statsStore";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { COMPLETION_MESSAGES } from "@/lib/constants";
import { getToday } from "@/lib/dates";

function getCompletionMessage(progress: number): string {
  const percent = Math.round(progress * 100);
  const thresholds = [100, 70, 40, 1, 0];

  for (const threshold of thresholds) {
    if (percent >= threshold) {
      return COMPLETION_MESSAGES[threshold]!;
    }
  }

  return COMPLETION_MESSAGES[0]!;
}

export default function WinsScreen() {
  const dailyBlocks = useScheduleStore((s) => s.dailyBlocks);
  const updateStreak = useStatsStore((s) => s.updateStreak);
  const currentStreak = useStatsStore((s) => s.currentStreak);
  const totalFocusMinutes = useStatsStore((s) => s.totalFocusMinutes);

  const today = getToday();
  const blocks = dailyBlocks[today] ?? [];
  const completedCount = blocks.filter((b) => b.done).length;
  const totalCount = blocks.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  const todayBreaks = useMemo(
    () => blocks.filter((b) => b.type === "break" && b.done).length,
    [blocks]
  );

  const todayFocusBlocks = useMemo(
    () => blocks.filter((b) => b.type === "focus" && b.done).length,
    [blocks]
  );

  useEffect(() => {
    if (completedCount > 0) {
      updateStreak(completedCount, totalCount);
    }
  }, [completedCount, totalCount, updateStreak]);

  const wolfMessage = useMemo(
    () => getCompletionMessage(progress),
    [progress]
  );

  return (
    <SafeAreaView className="flex-1 bg-bg-dark" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-3 pb-4">
          <Text
            className="text-den-green text-2xl"
            style={{ fontFamily: "Cinzel_700Bold" }}
          >
            Today's Pack Report
          </Text>
        </View>

        {/* Big completion fraction */}
        <View className="items-center mb-6">
          <View className="flex-row items-baseline">
            <Text
              className="text-text-primary text-7xl"
              style={{ fontFamily: "JetBrainsMono_700Bold" }}
            >
              {completedCount}
            </Text>
            <Text
              className="text-text-muted text-3xl"
              style={{ fontFamily: "JetBrainsMono_400Regular" }}
            >
              /{totalCount}
            </Text>
          </View>
          <Text
            className="text-text-muted text-sm mt-1"
            style={{ fontFamily: "Montserrat_400Regular" }}
          >
            blocks completed
          </Text>
        </View>

        {/* Progress bar */}
        <View className="px-5 mb-6">
          <ProgressBar
            progress={progress}
            color={progress >= 1 ? "#68d391" : "#0FACED"}
            height={8}
          />
          <Text
            className="text-text-muted text-xs text-center mt-2"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            {Math.round(progress * 100)}% complete
          </Text>
        </View>

        {/* Stat cards */}
        <View className="flex-row gap-3 px-5 mb-6">
          <Card className="flex-1">
            <Text className="text-2xl mb-1">{"\u{1F525}"}</Text>
            <Text
              className="text-hunt-orange text-2xl"
              style={{ fontFamily: "JetBrainsMono_700Bold" }}
            >
              {todayFocusBlocks}
            </Text>
            <Text
              className="text-text-muted text-xs mt-1"
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              Focus Hunts
            </Text>
          </Card>
          <Card className="flex-1">
            <Text className="text-2xl mb-1">{"\u{1F331}"}</Text>
            <Text
              className="text-den-green text-2xl"
              style={{ fontFamily: "JetBrainsMono_700Bold" }}
            >
              {todayBreaks}
            </Text>
            <Text
              className="text-text-muted text-xs mt-1"
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              Breaks Taken
            </Text>
          </Card>
        </View>

        {/* Wolf message */}
        <View className="mx-5 mb-6 bg-wolf-blue/10 border border-wolf-glow/20 rounded-xl p-4">
          <Text
            className="text-wolf-glow text-sm text-center italic"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            {wolfMessage}
          </Text>
        </View>

        {/* Streak */}
        {currentStreak > 0 && (
          <Card className="mx-5 mb-6 items-center">
            <Text className="text-3xl mb-2">{"\u{1F525}"}</Text>
            <Text
              className="text-hunt-orange text-3xl"
              style={{ fontFamily: "JetBrainsMono_700Bold" }}
            >
              {currentStreak}
            </Text>
            <Text
              className="text-text-muted text-sm mt-1"
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              day streak
            </Text>
          </Card>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
