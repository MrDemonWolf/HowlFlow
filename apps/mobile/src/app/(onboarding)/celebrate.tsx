import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, Switch, Text, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { CelebrationOverlay } from "@/components/ui/CelebrationOverlay";
import { FrostedCard } from "@/components/ui/FrostedCard";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { XPBadge } from "@/components/ui/XPBadge";
import { requestPermissions } from "@/lib/notifications";
import { useSettingsStore } from "@/stores/settingsStore";

export default function CelebrateScreen() {
  const router = useRouter();
  const { completeOnboarding, updateSettings, settings } = useSettingsStore();
  const [showCelebration, setShowCelebration] = useState(false);

  const [morningEnabled, setMorningEnabled] = useState(settings.notificationsEnabled);
  const [timerEnabled, setTimerEnabled] = useState(settings.timerAlertsEnabled);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const ensurePermission = useCallback(async () => {
    if (permissionRequested) return;
    setPermissionRequested(true);
    await requestPermissions();
  }, [permissionRequested]);

  const handleMorningToggle = useCallback(
    (value: boolean) => {
      setMorningEnabled(value);
      if (value) ensurePermission();
    },
    [ensurePermission],
  );

  const handleTimerToggle = useCallback(
    (value: boolean) => {
      setTimerEnabled(value);
      if (value) ensurePermission();
    },
    [ensurePermission],
  );

  const handleFinish = useCallback(() => {
    updateSettings({
      notificationsEnabled: morningEnabled,
      timerAlertsEnabled: timerEnabled,
    });
    setShowCelebration(true);
  }, [morningEnabled, timerEnabled, updateSettings]);

  const handleCelebrationDismiss = useCallback(() => {
    setShowCelebration(false);
    completeOnboarding();
  }, [completeOnboarding]);

  const title = (
    <View className="flex-row items-center justify-center">
      <Text className="text-3xl font-bold text-text-primary">Celebrate </Text>
      <Text style={{ fontSize: 30, fontWeight: "800", color: "#0FACED" }}>Every Win</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <OnboardingScreen
        step={4}
        title={title}
        subtitle="Earn XP, level up your Hunter, and see your focus grow day by day."
        nextLabel="🐺 Start My Hunt →"
        onNext={handleFinish}
        onBack={() => router.back()}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Hero icon area */}
          <View className="mb-6 items-center">
            <View style={{ width: 100, height: 100 }}>
              <View
                className="items-center justify-center"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 28,
                  backgroundColor: "rgba(15, 172, 237, 0.08)",
                  borderWidth: 1,
                  borderColor: "rgba(15, 172, 237, 0.2)",
                  borderCurve: "continuous",
                }}
              >
                <PlatformIcon iosName="bell.badge.fill" size={40} color="#0FACED" />
              </View>
              <View style={{ position: "absolute", top: -8, right: -16 }}>
                <XPBadge xp={500} color="#34D399" />
              </View>
            </View>
          </View>

          {/* Notification toggle cards */}
          <View className="gap-3">
            <FrostedCard>
              <View className="flex-row items-center gap-4">
                <Text style={{ fontSize: 22 }}>🌅</Text>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text-primary">
                    Morning Reminder
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    Start your day with your schedule ready
                  </Text>
                </View>
                <Switch
                  value={morningEnabled}
                  onValueChange={handleMorningToggle}
                  trackColor={{ false: "#1A2D5E", true: "#0FACED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </FrostedCard>

            <FrostedCard>
              <View className="flex-row items-center gap-4">
                <Text style={{ fontSize: 22 }}>⏱</Text>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text-primary">
                    Timer Alerts
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    Know when focus sessions and breaks end
                  </Text>
                </View>
                <Switch
                  value={timerEnabled}
                  onValueChange={handleTimerToggle}
                  trackColor={{ false: "#1A2D5E", true: "#0FACED" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </FrostedCard>

            {/* No Spam card */}
            <FrostedCard borderColor="rgba(52, 211, 153, 0.15)">
              <View className="flex-row items-center gap-3">
                <PlatformIcon iosName="checkmark.shield.fill" size={18} color="#34D399" />
                <Text className="flex-1 text-sm font-medium text-text-primary">
                  Only useful, timely notifications. We respect your focus.
                </Text>
              </View>
            </FrostedCard>

            <Text className="text-center text-xs italic text-text-muted">
              Notifications are optional — enable anytime in Settings.
            </Text>
          </View>
        </ScrollView>
      </OnboardingScreen>

      <CelebrationOverlay
        visible={showCelebration}
        emoji="🐺"
        title="Let's Hunt!"
        subtitle="Your first day starts now."
        onDismiss={handleCelebrationDismiss}
      />
    </View>
  );
}
