import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { useSettingsStore } from "@/stores/settingsStore";

export default function WelcomeScreen() {
  const router = useRouter();
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);

  return (
    <OnboardingScreen
      title="Welcome to HowlFlow"
      subtitle="Your ADHD-friendly daily planner. Structure your day with time blocks, stay focused with the Pomodoro timer, and track your wins."
      nextLabel="Get Started"
      onNext={() => router.push("/(onboarding)/schedule")}
      skipLabel="Skip Setup"
      onSkip={completeOnboarding}
    >
      <View className="flex-1 items-center justify-center">
        <Text style={{ fontSize: 80 }}>🐺</Text>
      </View>
    </OnboardingScreen>
  );
}
