import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { SettingsRow } from "@/components/ui/SettingsRow";
import { SettingsSection } from "@/components/ui/SettingsSection";
import { SettingsToggleRow } from "@/components/ui/SettingsToggleRow";
import { WolfEmblem } from "@/components/ui/WolfEmblem";
import { useHaptics } from "@/hooks/useHaptics";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ThemePreference } from "@/types";

const THEME_VALUES: ThemePreference[] = ["dark", "light", "auto"];
const THEME_LABELS = ["Dark", "Light", "System"];

const appVersion = Constants.expoConfig?.version ?? "1.0.0";

export default function SettingsScreen() {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { selection } = useHaptics();
  const router = useRouter();

  const cycleTime = useCallback(
    (field: "wakeUpTime" | "windDownTime" | "morningReminderTime", current: string) => {
      const [h, m] = current.split(":").map(Number);
      const totalMins = (h * 60 + m + 30) % (24 * 60);
      const newH = Math.floor(totalMins / 60);
      const newM = totalMins % 60;
      const newTime = `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
      updateSettings({ [field]: newTime });
      selection();
    },
    [updateSettings, selection]
  );

  const cycleMinutes = useCallback(
    (
      field: "workMinutes" | "breakMinutes" | "longBreakMinutes",
      current: number,
      step: number,
      min: number,
      max: number
    ) => {
      let next = current + step;
      if (next > max) next = min;
      updateSettings({ [field]: next });
      selection();
    },
    [updateSettings, selection]
  );

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
  };

  const handleRestartOnboarding = useCallback(() => {
    Alert.alert(
      "Restart Onboarding",
      "This will take you back through the setup flow. Your data won't be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Restart",
          onPress: () => {
            updateSettings({ onboardingCompleted: false });
            router.dismiss();
          },
        },
      ]
    );
  }, [updateSettings, router]);

  const handleReset = useCallback(() => {
    Alert.alert("Reset Settings", "This will reset all settings to defaults.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => resetSettings(),
      },
    ]);
  }, [resetSettings]);

  const themeIndex = THEME_VALUES.indexOf(settings.themePreference);

  return (
    <ScrollView
      className="flex-1 px-4"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 48 }}
    >
      {/* Schedule */}
      <SettingsSection
        title="Schedule"
        helperText="Your schedule helps calculate optimal deep work blocks."
      >
        <SettingsRow
          label="Wake-up Time"
          icon="sunrise.fill"
          iconColor="#FBBF24"
          value={formatTime(settings.wakeUpTime)}
          valueColor="#FBBF24"
          onPress={() => cycleTime("wakeUpTime", settings.wakeUpTime)}
        />
        <SettingsRow
          label="Wind-down Time"
          icon="moon.stars.fill"
          iconColor="#7C5CFC"
          value={formatTime(settings.windDownTime)}
          valueColor="#7C5CFC"
          onPress={() => cycleTime("windDownTime", settings.windDownTime)}
          isLast
        />
      </SettingsSection>

      {/* Timer Settings */}
      <SettingsSection title="Timer Settings">
        <SettingsRow
          label="Work Duration"
          icon="flame.fill"
          iconColor="#0FACED"
          value={`${settings.workMinutes} min`}
          valueColor="#0FACED"
          onPress={() => cycleMinutes("workMinutes", settings.workMinutes, 5, 15, 60)}
        />
        <SettingsRow
          label="Short Break"
          icon="cup.and.saucer.fill"
          iconColor="#34D399"
          value={`${settings.breakMinutes} min`}
          valueColor="#34D399"
          onPress={() => cycleMinutes("breakMinutes", settings.breakMinutes, 1, 3, 15)}
        />
        <SettingsRow
          label="Long Break"
          icon="leaf.fill"
          iconColor="#34D399"
          value={`${settings.longBreakMinutes} min`}
          valueColor="#34D399"
          onPress={() => cycleMinutes("longBreakMinutes", settings.longBreakMinutes, 5, 10, 30)}
          isLast
        />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications">
        <SettingsToggleRow
          label="Enable Notifications"
          icon="bell.fill"
          iconColor="#0FACED"
          value={settings.notificationsEnabled}
          onValueChange={(v) => updateSettings({ notificationsEnabled: v })}
        />
        <SettingsToggleRow
          label="Timer Alerts"
          icon="timer"
          iconColor="#FBBF24"
          value={settings.timerAlertsEnabled}
          onValueChange={(v) => updateSettings({ timerAlertsEnabled: v })}
        />
        <SettingsRow
          label="Morning Reminder"
          icon="alarm.fill"
          iconColor="#FBBF24"
          value={formatTime(settings.morningReminderTime)}
          valueColor="#FBBF24"
          onPress={() => cycleTime("morningReminderTime", settings.morningReminderTime)}
          isLast
        />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance">
        <SettingsRow
          label="Theme"
          icon="paintbrush.fill"
          iconColor="#7C5CFC"
        >
          <SegmentedControl
            values={THEME_LABELS}
            selectedIndex={themeIndex >= 0 ? themeIndex : 0}
            style={{ width: 180 }}
            onChange={(event) => {
              const idx = event.nativeEvent.selectedSegmentIndex;
              updateSettings({ themePreference: THEME_VALUES[idx] });
              selection();
            }}
          />
        </SettingsRow>
        <SettingsToggleRow
          label="Haptics"
          icon="hand.tap.fill"
          iconColor="#0FACED"
          value={settings.hapticsEnabled}
          onValueChange={(v) => updateSettings({ hapticsEnabled: v })}
          isLast
        />
      </SettingsSection>

      {/* Data & Storage */}
      <SettingsSection title="Data & Storage">
        <SettingsToggleRow
          label="iCloud Sync"
          icon="icloud.fill"
          iconColor="#0FACED"
          value={settings.iCloudSyncEnabled}
          onValueChange={(v) => updateSettings({ iCloudSyncEnabled: v })}
        />
        <SettingsRow
          label="Restart Onboarding"
          icon="arrow.counterclockwise"
          iconColor="#FBBF24"
          onPress={handleRestartOnboarding}
        />
        <SettingsRow
          label="Reset All Settings"
          icon="arrow.counterclockwise"
          iconColor="#F87171"
          destructive
          onPress={handleReset}
          isLast
        />
      </SettingsSection>

      {/* Footer */}
      <View className="items-center pb-8 pt-4">
        <WolfEmblem size={48} />
        <Text className="mt-3 text-sm font-medium text-text-muted">
          HowlFlow v{appVersion}
        </Text>
        <Text className="mt-1 text-xs text-text-muted">
          Made with ♥ for ADHD Minds
        </Text>
      </View>
    </ScrollView>
  );
}
