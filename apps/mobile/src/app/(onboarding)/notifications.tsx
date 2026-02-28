import { useCallback } from "react";
import { Text, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { requestPermissions } from "@/lib/notifications";
import { useSettingsStore } from "@/stores/settingsStore";

export default function NotificationsSetupScreen() {
  const { completeOnboarding, updateSettings } = useSettingsStore();

  const handleEnable = useCallback(async () => {
    await requestPermissions();
    completeOnboarding();
  }, [completeOnboarding]);

  const handleSkip = useCallback(() => {
    updateSettings({ notificationsEnabled: false });
    completeOnboarding();
  }, [updateSettings, completeOnboarding]);

  return (
    <OnboardingScreen
      step={3}
      title="Notifications"
      subtitle="Get reminders for your morning schedule and timer completions."
      nextLabel="Enable Notifications"
      onNext={handleEnable}
      skipLabel="Not Now"
      onSkip={handleSkip}
    >
      <View className="gap-4">
        <NotificationBenefit
          emoji="🌅"
          title="Morning Reminder"
          description="Start your day with your schedule ready"
        />
        <NotificationBenefit
          emoji="🎯"
          title="Timer Alerts"
          description="Know when focus sessions and breaks end"
        />
        <NotificationBenefit
          emoji="🔇"
          title="No Spam"
          description="Only useful, timely notifications"
        />
      </View>
    </OnboardingScreen>
  );
}

function NotificationBenefit({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-center gap-4 rounded-xl bg-bg-card px-4 py-4">
      <Text style={{ fontSize: 28 }}>{emoji}</Text>
      <View className="flex-1">
        <Text className="text-base font-semibold text-text-primary">{title}</Text>
        <Text className="text-sm text-text-secondary">{description}</Text>
      </View>
    </View>
  );
}
