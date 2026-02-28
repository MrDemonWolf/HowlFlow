import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { useSettingsStore } from "@/stores/settingsStore";

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function cycleTime(current: string): string {
  const [h, m] = current.split(":").map(Number);
  const totalMins = (h * 60 + m + 30) % (24 * 60);
  const newH = Math.floor(totalMins / 60);
  const newM = totalMins % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

function TimeRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between rounded-xl bg-bg-card px-4 py-4"
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${formatTime(value)}`}
    >
      <Text className="text-base text-text-primary">{label}</Text>
      <Text className="text-base font-semibold text-wolf-blue">{formatTime(value)}</Text>
    </TouchableOpacity>
  );
}

export default function ScheduleSetupScreen() {
  const router = useRouter();
  const updateSettings = useSettingsStore((s) => s.updateSettings);

  const [wakeUp, setWakeUp] = useState("07:00");
  const [windDown, setWindDown] = useState("21:00");

  const handleNext = useCallback(() => {
    updateSettings({ wakeUpTime: wakeUp, windDownTime: windDown });
    router.push("/(onboarding)/timer");
  }, [wakeUp, windDown, updateSettings, router]);

  return (
    <OnboardingScreen
      step={1}
      title="Your Schedule"
      subtitle="When do you start and end your day? Tap to change (30-min steps)."
      onNext={handleNext}
      onSkip={() => router.push("/(onboarding)/timer")}
    >
      <View className="gap-3">
        <TimeRow
          label="Wake Up"
          value={wakeUp}
          onPress={() => setWakeUp(cycleTime(wakeUp))}
        />
        <TimeRow
          label="Wind Down"
          value={windDown}
          onPress={() => setWindDown(cycleTime(windDown))}
        />
      </View>
    </OnboardingScreen>
  );
}
