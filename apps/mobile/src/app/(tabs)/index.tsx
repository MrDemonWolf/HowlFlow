import React, { useEffect, useRef, useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useReducedMotion,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useScheduleStore } from "@/stores/scheduleStore";
import { getToday } from "@/lib/dates";
import { hapticHeavy } from "@/lib/haptics";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { TimeBar } from "@/components/schedule/TimeBar";
import { QuoteBar } from "@/components/schedule/QuoteBar";
import { QuickActions } from "@/components/schedule/QuickActions";
import { TimeBlockCard } from "@/components/schedule/TimeBlockCard";
import { PlatformIcon } from "@/components/ui/PlatformIcon";

export default function ScheduleScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const generateDailyBlocks = useScheduleStore((s) => s.generateDailyBlocks);
  const cleanOldData = useScheduleStore((s) => s.cleanOldData);
  const dailyBlocks = useScheduleStore((s) => s.dailyBlocks);
  const reducedMotion = useReducedMotion();

  const today = getToday();
  const blocks = dailyBlocks[today] ?? [];
  const completedCount = blocks.filter((b) => b.done).length;
  const totalCount = blocks.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;
  const isComplete = progress >= 1 && totalCount > 0;

  // Celebration glow animation
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (isComplete && !reducedMotion) {
      hapticHeavy();
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 600 })
        ),
        3,
        true
      );
    } else {
      glowOpacity.value = 0;
    }
  }, [isComplete, reducedMotion, glowOpacity]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  useEffect(() => {
    generateDailyBlocks(today);
    cleanOldData(30);
  }, [today, generateDailyBlocks, cleanOldData]);

  return (
    <SafeAreaView className="flex-1 bg-bg-dark" edges={["top"]}>
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-1">
          <Text
            className="text-wolf-blue text-2xl"
            style={{ fontFamily: "Cinzel_700Bold" }}
          >
            Today's Trail
          </Text>
          <Pressable
            onPress={() => router.push("/settings")}
            accessibilityLabel="Open settings"
            accessibilityRole="button"
            className="p-2"
          >
            <PlatformIcon
              name="gearshape"
              size={22}
              tintColor="#94A3C8"
              accessibilityLabel="Settings"
            />
          </Pressable>
        </View>

        <TimeBar />
        <QuoteBar />
        <QuickActions />

        {/* Progress summary */}
        {totalCount > 0 && (
          <View className="px-5 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text
                className="text-text-secondary text-sm"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
              >
                Daily Progress
              </Text>
              <Text
                className="text-text-muted text-xs"
                style={{ fontFamily: "JetBrainsMono_400Regular" }}
              >
                {completedCount}/{totalCount} blocks
              </Text>
            </View>
            <View>
              <ProgressBar
                progress={progress}
                color={isComplete ? "#68d391" : "#0FACED"}
                height={6}
              />
              {isComplete && (
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      top: -2,
                      left: 0,
                      right: 0,
                      bottom: -2,
                      borderRadius: 6,
                      backgroundColor: "#68d391",
                    },
                    glowStyle,
                  ]}
                />
              )}
            </View>
          </View>
        )}

        {/* Celebration message */}
        {isComplete && (
          <View className="mx-5 mb-4 bg-den-green/15 border border-den-green/30 rounded-xl p-4">
            <Text
              className="text-den-green text-sm text-center"
              style={{ fontFamily: "Montserrat_700Bold" }}
            >
              LEGENDARY WOLF STATUS!
            </Text>
            <Text
              className="text-den-green/80 text-xs text-center mt-1"
              style={{ fontFamily: "Roboto_400Regular" }}
            >
              You completed every block. The whole forest heard that howl.
            </Text>
          </View>
        )}

        {/* Block cards */}
        {blocks.length > 0 ? (
          blocks.map((block, index) => (
            <TimeBlockCard key={block.id} block={block} index={index} />
          ))
        ) : (
          <EmptyState
            title="No blocks yet"
            message="Your schedule templates will generate today's blocks. Check your settings to customize templates."
            emoji={"\u{1F43A}"}
          />
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
