import React, { useEffect, useCallback, useRef } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useTimerStore } from "@/stores/timerStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useStatsStore } from "@/stores/statsStore";
import { useScheduleStore } from "@/stores/scheduleStore";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { secondsToMMSS } from "@/lib/dates";
import { successFeedback, tapFeedback, warningFeedback } from "@/lib/haptics";
import {
  scheduleTimerCompleteNotification,
  cancelAllTimerNotifications,
} from "@/lib/notifications";

export default function TimerScreen() {
  const params = useLocalSearchParams<{
    blockId?: string;
    blockLabel?: string;
  }>();

  const {
    mode,
    timeLeft,
    running,
    sessions,
    linkedBlockId,
    start,
    pause,
    reset,
    tick,
    setLinkedBlock,
  } = useTimerStore();

  const pomodoroWorkMinutes = useSettingsStore((s) => s.pomodoroWorkMinutes);
  const pomodoroBreakMinutes = useSettingsStore((s) => s.pomodoroBreakMinutes);
  const recordFocusSession = useStatsStore((s) => s.recordFocusSession);
  const toggleBlock = useScheduleStore((s) => s.toggleBlock);

  const notifIdRef = useRef<string | null>(null);
  const prevMode = useRef(mode);
  const prevRunning = useRef(running);

  // Tick interval
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [running, tick]);

  // Detect mode switch (timer completed a cycle)
  useEffect(() => {
    if (prevMode.current !== mode && prevRunning.current) {
      successFeedback();

      if (prevMode.current === "work") {
        recordFocusSession(pomodoroWorkMinutes);

        // Offer to mark linked block complete
        if (linkedBlockId) {
          Alert.alert(
            "Hunt Complete",
            "Mark the linked block as done?",
            [
              { text: "Not Yet", style: "cancel" },
              {
                text: "Mark Done",
                onPress: () => {
                  toggleBlock(linkedBlockId);
                  setLinkedBlock(null);
                },
              },
            ]
          );
        }
      }

      // Cancel old notification
      if (notifIdRef.current) {
        cancelAllTimerNotifications();
        notifIdRef.current = null;
      }
    }
    prevMode.current = mode;
    prevRunning.current = running;
  }, [
    mode,
    running,
    linkedBlockId,
    pomodoroWorkMinutes,
    recordFocusSession,
    toggleBlock,
    setLinkedBlock,
  ]);

  // Set linked block from deep link
  useEffect(() => {
    if (params.blockId) {
      setLinkedBlock(params.blockId);
    }
  }, [params.blockId, setLinkedBlock]);

  const handleStart = useCallback(async () => {
    tapFeedback();
    start();
    const notifId = await scheduleTimerCompleteNotification(
      timeLeft,
      params.blockLabel ?? (mode === "work" ? "Focus Hunt" : "Break")
    );
    if (notifId) notifIdRef.current = notifId;
  }, [start, timeLeft, params.blockLabel, mode]);

  const handlePause = useCallback(async () => {
    tapFeedback();
    pause();
    await cancelAllTimerNotifications();
    notifIdRef.current = null;
  }, [pause]);

  const handleReset = useCallback(async () => {
    warningFeedback();
    reset();
    await cancelAllTimerNotifications();
    notifIdRef.current = null;
  }, [reset]);

  const totalSeconds =
    mode === "work"
      ? pomodoroWorkMinutes * 60
      : pomodoroBreakMinutes * 60;
  const progress = totalSeconds > 0 ? 1 - timeLeft / totalSeconds : 0;

  const isWorkMode = mode === "work";
  const ringColor = isWorkMode ? "#fc814a" : "#68d391";
  const modeLabel = isWorkMode ? "Hunt Mode" : "Rest at Den";
  const modeLabelColor = isWorkMode ? "text-hunt-orange" : "text-den-green";

  return (
    <SafeAreaView className="flex-1 bg-bg-dark" edges={["top"]}>
      <View className="flex-1 items-center justify-center px-6">
        {/* Mode label */}
        <Text
          className={`${modeLabelColor} text-lg mb-2`}
          style={{ fontFamily: "Cinzel_700Bold" }}
        >
          {modeLabel}
        </Text>

        {/* Hunt count */}
        <Text
          className="text-text-muted text-sm mb-6"
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          {sessions} hunt{sessions !== 1 ? "s" : ""} completed
        </Text>

        {/* Timer ring */}
        <ProgressRing
          progress={progress}
          size={260}
          strokeWidth={12}
          color={ringColor}
        >
          <Text
            className="text-text-primary text-5xl"
            style={{ fontFamily: "JetBrainsMono_700Bold" }}
          >
            {secondsToMMSS(timeLeft)}
          </Text>
          {running && (
            <Text
              className="text-text-muted text-xs mt-1"
              style={{ fontFamily: "Roboto_400Regular" }}
            >
              remaining
            </Text>
          )}
        </ProgressRing>

        {/* Linked block indicator */}
        {linkedBlockId && (
          <Text
            className="text-text-muted text-xs mt-4"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            Linked to block
          </Text>
        )}

        {/* Controls */}
        <View className="mt-10 w-full">
          {!running && (
            <Button
              title={isWorkMode ? "Start Hunt" : "Start Break"}
              onPress={handleStart}
              variant="primary"
              accessibilityLabel={
                isWorkMode ? "Start focus hunt" : "Start break timer"
              }
            />
          )}

          {running && (
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Pause"
                  onPress={handlePause}
                  variant="secondary"
                  accessibilityLabel="Pause timer"
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Reset"
                  onPress={handleReset}
                  variant="ghost"
                  accessibilityLabel="Reset timer"
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
