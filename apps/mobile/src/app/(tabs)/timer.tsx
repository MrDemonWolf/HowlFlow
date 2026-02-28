import { useEffect, useRef, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { LiveActivity } from "expo-widgets";

import { ProgressRing } from "@/components/ui/ProgressRing";
import { useHaptics } from "@/hooks/useHaptics";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTimerStore } from "@/stores/timerStore";
import type { TimerMode } from "@/types";
import { TimerActivity } from "@/widgets/TimerActivity";

const MODE_LABELS: Record<TimerMode, string> = {
  work: "Focus Time",
  break: "Short Break",
  longBreak: "Long Break",
};

const MODE_COLORS: Record<TimerMode, string> = {
  work: "#0FACED",
  break: "#34D399",
  longBreak: "#7C5CFC",
};

function formatSeconds(s: number): string {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function TimerScreen() {
  const { settings } = useSettingsStore();
  const {
    mode,
    sessionsCompleted,
    isRunning,
    timeLeft,
    tick,
    start,
    pause,
    resume,
    reset,
    completeSession,
  } = useTimerStore();
  const { impact, notification } = useHaptics();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const liveActivityRef = useRef<LiveActivity<{
    mode: string;
    modeLabel: string;
    timeLeftFormatted: string;
    totalDuration: number;
    sessionsCompleted: number;
    color: string;
  }> | null>(null);

  const getDuration = useCallback(
    (m: TimerMode) => {
      switch (m) {
        case "work":
          return settings.workMinutes * 60;
        case "break":
          return settings.breakMinutes * 60;
        case "longBreak":
          return settings.longBreakMinutes * 60;
      }
    },
    [settings.workMinutes, settings.breakMinutes, settings.longBreakMinutes]
  );

  // Initialize timer if timeLeft is 0
  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      reset(getDuration(mode));
    }
  }, [mode, timeLeft, isRunning, reset, getDuration]);

  // Tick interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick]);

  // Live Activity: start/update/end
  useEffect(() => {
    if (isRunning && !liveActivityRef.current) {
      const duration = getDuration(mode);
      liveActivityRef.current = TimerActivity.start({
        mode,
        modeLabel: MODE_LABELS[mode],
        timeLeftFormatted: formatSeconds(timeLeft),
        totalDuration: duration,
        sessionsCompleted,
        color: MODE_COLORS[mode],
      });
    } else if (isRunning && liveActivityRef.current) {
      liveActivityRef.current.update({
        mode,
        modeLabel: MODE_LABELS[mode],
        timeLeftFormatted: formatSeconds(timeLeft),
        totalDuration: getDuration(mode),
        sessionsCompleted,
        color: MODE_COLORS[mode],
      });
    } else if (!isRunning && liveActivityRef.current) {
      liveActivityRef.current.end("immediate");
      liveActivityRef.current = null;
    }
  }, [isRunning, timeLeft, mode, sessionsCompleted, getDuration]);

  // Session completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      notification();
      // End current live activity before mode changes
      if (liveActivityRef.current) {
        liveActivityRef.current.end("immediate");
        liveActivityRef.current = null;
      }
      completeSession(
        settings.workMinutes,
        settings.breakMinutes,
        settings.longBreakMinutes,
        settings.sessionsBeforeLongBreak
      );
    }
  }, [
    timeLeft,
    isRunning,
    notification,
    completeSession,
    settings.workMinutes,
    settings.breakMinutes,
    settings.longBreakMinutes,
    settings.sessionsBeforeLongBreak,
  ]);

  const duration = getDuration(mode);
  const progress = duration > 0 ? (duration - timeLeft) / duration : 0;
  const color = MODE_COLORS[mode];

  const handleStartPause = useCallback(() => {
    impact();
    if (isRunning) {
      pause();
    } else if (timeLeft > 0) {
      resume();
    } else {
      start(getDuration(mode));
    }
  }, [isRunning, timeLeft, mode, impact, pause, resume, start, getDuration]);

  const handleReset = useCallback(() => {
    impact();
    if (liveActivityRef.current) {
      liveActivityRef.current.end("immediate");
      liveActivityRef.current = null;
    }
    reset(getDuration(mode));
  }, [impact, reset, getDuration, mode]);

  return (
    <View className="flex-1 items-center justify-center">
      {/* Mode label */}
      <Text className="mb-2 text-sm font-medium uppercase text-text-secondary">
        {MODE_LABELS[mode]}
      </Text>

      {/* Progress ring */}
      <ProgressRing
        size={260}
        strokeWidth={12}
        progress={progress}
        color={color}
      >
        <Text className="text-5xl font-bold text-text-primary">
          {formatSeconds(timeLeft)}
        </Text>
      </ProgressRing>

      {/* Sessions counter */}
      <Text className="mt-4 text-sm text-text-secondary">
        Sessions: {sessionsCompleted}
      </Text>

      {/* Controls */}
      <View className="mt-8 flex-row gap-4">
        <TouchableOpacity
          onPress={handleReset}
          className="rounded-xl bg-bg-card px-6 py-3"
          accessibilityRole="button"
          accessibilityLabel="Reset timer"
        >
          <Text className="text-base font-medium text-text-secondary">Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleStartPause}
          className="rounded-xl px-8 py-3"
          style={{ backgroundColor: color }}
          accessibilityRole="button"
          accessibilityLabel={isRunning ? "Pause timer" : "Start timer"}
        >
          <Text className="text-base font-bold text-bg-base">
            {isRunning ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
