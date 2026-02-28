import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { useSettingsStore } from "@/stores/settingsStore";

function cycleMinutes(current: number, step: number, min: number, max: number): number {
  const next = current + step;
  return next > max ? min : next;
}

function MinuteRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between rounded-xl bg-bg-card px-4 py-4"
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value} minutes`}
    >
      <Text className="text-base text-text-primary">{label}</Text>
      <Text className="text-base font-semibold text-wolf-blue">{value} min</Text>
    </TouchableOpacity>
  );
}

export default function TimerSetupScreen() {
  const router = useRouter();
  const updateSettings = useSettingsStore((s) => s.updateSettings);

  const [work, setWork] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const handleNext = useCallback(() => {
    updateSettings({
      workMinutes: work,
      breakMinutes: breakMins,
      longBreakMinutes: longBreak,
    });
    router.push("/(onboarding)/notifications");
  }, [work, breakMins, longBreak, updateSettings, router]);

  return (
    <OnboardingScreen
      step={2}
      title="Focus Timer"
      subtitle="Set your Pomodoro intervals. Tap to adjust."
      onNext={handleNext}
      onSkip={() => router.push("/(onboarding)/notifications")}
    >
      <View className="gap-3">
        <MinuteRow
          label="Work"
          value={work}
          onPress={() => setWork(cycleMinutes(work, 5, 15, 60))}
        />
        <MinuteRow
          label="Break"
          value={breakMins}
          onPress={() => setBreakMins(cycleMinutes(breakMins, 1, 3, 15))}
        />
        <MinuteRow
          label="Long Break"
          value={longBreak}
          onPress={() => setLongBreak(cycleMinutes(longBreak, 5, 10, 30))}
        />
      </View>
    </OnboardingScreen>
  );
}
