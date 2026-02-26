import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useSettingsStore } from "@/stores/settingsStore";
import { useScheduleStore } from "@/stores/scheduleStore";
import {
  requestNotificationPermissions,
  scheduleMorningReminder,
} from "@/lib/notifications";
import { tapFeedback, warningFeedback } from "@/lib/haptics";
import { storage } from "@/lib/storage";

// --- Sub-components ---

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text
        className="text-text-muted text-xs uppercase tracking-wider px-5 mb-2"
        style={{ fontFamily: "Montserrat_700Bold" }}
      >
        {title}
      </Text>
      <View className="bg-bg-card mx-5 rounded-xl border border-text-dim/10 overflow-hidden">
        {children}
      </View>
    </View>
  );
}

function SettingsRow({
  label,
  value,
  onPress,
  rightElement,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}) {
  const inner = (
    <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-text-dim/10">
      <Text
        className="text-text-primary text-sm flex-1"
        style={{ fontFamily: "Montserrat_400Regular" }}
      >
        {label}
      </Text>
      {rightElement ?? (
        <Text
          className="text-text-secondary text-sm"
          style={{ fontFamily: "Roboto_400Regular" }}
        >
          {value}
        </Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
      >
        {inner}
      </Pressable>
    );
  }
  return inner;
}

function NumberStepper({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  max = 120,
  suffix = "m",
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <View className="flex-row items-center gap-3">
      <Pressable
        onPress={() => {
          if (value > min) {
            tapFeedback();
            onDecrease();
          }
        }}
        className="w-8 h-8 rounded-lg bg-bg-surface items-center justify-center"
        accessibilityLabel="Decrease"
        accessibilityRole="button"
      >
        <Text className="text-text-primary text-lg">{"\u2212"}</Text>
      </Pressable>
      <Text
        className="text-text-primary text-sm w-12 text-center"
        style={{ fontFamily: "JetBrainsMono_400Regular" }}
      >
        {value}
        {suffix}
      </Text>
      <Pressable
        onPress={() => {
          if (value < max) {
            tapFeedback();
            onIncrease();
          }
        }}
        className="w-8 h-8 rounded-lg bg-bg-surface items-center justify-center"
        accessibilityLabel="Increase"
        accessibilityRole="button"
      >
        <Text className="text-text-primary text-lg">+</Text>
      </Pressable>
    </View>
  );
}

function OptionPicker({
  value,
  options,
  onSelect,
}: {
  value: number;
  options: number[];
  onSelect: (v: number) => void;
}) {
  return (
    <View className="flex-row items-center gap-1">
      {options.map((opt) => (
        <Pressable
          key={opt}
          onPress={() => {
            tapFeedback();
            onSelect(opt);
          }}
          className={`px-3 py-1.5 rounded-lg ${value === opt ? "bg-wolf-blue/20" : "bg-transparent"}`}
          accessibilityLabel={`${opt} minutes`}
          accessibilityRole="button"
        >
          <Text
            className={`text-xs ${value === opt ? "text-wolf-blue" : "text-text-muted"}`}
            style={{ fontFamily: "JetBrainsMono_400Regular" }}
          >
            {opt}m
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// --- Main Screen ---

export default function SettingsScreen() {
  const settings = useSettingsStore();
  const templates = useScheduleStore((s) => s.templates);
  const deleteTemplate = useScheduleStore((s) => s.deleteTemplate);
  const resetTodaysBlocks = useScheduleStore((s) => s.resetTodaysBlocks);

  const handleToggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermissions();
      settings.updateSetting("notificationsEnabled", granted);
      if (granted) {
        scheduleMorningReminder(settings.morningReminderTime);
      }
    } else {
      settings.updateSetting("notificationsEnabled", false);
    }
  };

  const handleResetToday = () => {
    Alert.alert(
      "Reset Today's Blocks",
      "This will regenerate today's schedule from your templates. Current progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            warningFeedback();
            resetTodaysBlocks();
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will erase all your blocks, stats, brain dumps, and settings. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Everything",
          style: "destructive",
          onPress: () => {
            warningFeedback();
            storage.clearAll();
            settings.resetSettings();
            Alert.alert(
              "Done",
              "All data has been cleared. Restart the app for a fresh start."
            );
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerStyle: { backgroundColor: "#091533" },
          headerTintColor: "#E8F0FE",
          headerTitleStyle: { fontFamily: "Cinzel_700Bold" },
        }}
      />
      <SafeAreaView className="flex-1 bg-bg-dark" edges={[]}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="h-4" />

          {/* Timer */}
          <SettingsSection title="Timer">
            <SettingsRow
              label="Work Duration"
              rightElement={
                <NumberStepper
                  value={settings.pomodoroWorkMinutes}
                  onDecrease={() =>
                    settings.updateSetting(
                      "pomodoroWorkMinutes",
                      settings.pomodoroWorkMinutes - 5
                    )
                  }
                  onIncrease={() =>
                    settings.updateSetting(
                      "pomodoroWorkMinutes",
                      settings.pomodoroWorkMinutes + 5
                    )
                  }
                  min={5}
                  max={120}
                />
              }
            />
            <SettingsRow
              label="Break Duration"
              rightElement={
                <NumberStepper
                  value={settings.pomodoroBreakMinutes}
                  onDecrease={() =>
                    settings.updateSetting(
                      "pomodoroBreakMinutes",
                      settings.pomodoroBreakMinutes - 1
                    )
                  }
                  onIncrease={() =>
                    settings.updateSetting(
                      "pomodoroBreakMinutes",
                      settings.pomodoroBreakMinutes + 1
                    )
                  }
                  min={1}
                  max={30}
                />
              }
            />
          </SettingsSection>

          {/* Schedule */}
          <SettingsSection title="Schedule">
            <SettingsRow label="Wake Up Time" value={settings.wakeUpTime} />
            <SettingsRow label="Wind Down Time" value={settings.windDownTime} />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection title="Notifications">
            <SettingsRow
              label="Enable Notifications"
              rightElement={
                <Switch
                  value={settings.notificationsEnabled}
                  onValueChange={handleToggleNotifications}
                  trackColor={{ false: "#3A4A6B", true: "#0FACED" }}
                  accessibilityLabel="Toggle notifications"
                />
              }
            />
            {settings.notificationsEnabled && (
              <>
                <SettingsRow
                  label="Remind Before Block"
                  rightElement={
                    <OptionPicker
                      value={settings.notifyMinutesBefore}
                      options={[3, 5, 10]}
                      onSelect={(v) =>
                        settings.updateSetting("notifyMinutesBefore", v)
                      }
                    />
                  }
                />
                <SettingsRow
                  label="Morning Reminder"
                  value={settings.morningReminderTime}
                />
              </>
            )}
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection title="Appearance">
            <SettingsRow
              label="Haptic Feedback"
              rightElement={
                <Switch
                  value={settings.hapticsEnabled}
                  onValueChange={(v) =>
                    settings.updateSetting("hapticsEnabled", v)
                  }
                  trackColor={{ false: "#3A4A6B", true: "#0FACED" }}
                  accessibilityLabel="Toggle haptic feedback"
                />
              }
            />
            <SettingsRow
              label="Wolf Quotes"
              rightElement={
                <Switch
                  value={settings.wolfQuotesEnabled}
                  onValueChange={(v) =>
                    settings.updateSetting("wolfQuotesEnabled", v)
                  }
                  trackColor={{ false: "#3A4A6B", true: "#0FACED" }}
                  accessibilityLabel="Toggle wolf quotes"
                />
              }
            />
          </SettingsSection>

          {/* Templates */}
          <SettingsSection title="Schedule Templates">
            {templates.map((t) => (
              <SettingsRow
                key={t.id}
                label={`${t.emoji} ${t.label}`}
                value={`${t.duration}m`}
                onPress={() => {
                  Alert.alert(
                    t.label,
                    `Type: ${t.type}\nDuration: ${t.duration}m\nTasks: ${t.defaultTasks.join(", ")}`,
                    [
                      { text: "OK" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          warningFeedback();
                          deleteTemplate(t.id);
                        },
                      },
                    ]
                  );
                }}
              />
            ))}
          </SettingsSection>

          {/* Data */}
          <SettingsSection title="Data">
            <SettingsRow
              label="Reset Today's Blocks"
              onPress={handleResetToday}
              rightElement={
                <Text
                  className="text-hunt-orange text-sm"
                  style={{ fontFamily: "Roboto_400Regular" }}
                >
                  {"\u21BB"}
                </Text>
              }
            />
            <SettingsRow
              label="Clear All Data"
              onPress={handleClearData}
              rightElement={
                <Text
                  className="text-red-400 text-sm"
                  style={{ fontFamily: "Roboto_400Regular" }}
                >
                  {"\u26A0"}
                </Text>
              }
            />
          </SettingsSection>

          {/* About */}
          <SettingsSection title="About">
            <SettingsRow label="Version" value="1.0.0" />
            <SettingsRow
              label="Privacy Policy"
              onPress={() =>
                Linking.openURL(
                  "https://mrdemonwolf.github.io/howlflow/privacy"
                )
              }
              rightElement={
                <Text className="text-wolf-blue text-sm">{"\u2192"}</Text>
              }
            />
            <SettingsRow
              label="Terms of Service"
              onPress={() =>
                Linking.openURL(
                  "https://mrdemonwolf.github.io/howlflow/terms"
                )
              }
              rightElement={
                <Text className="text-wolf-blue text-sm">{"\u2192"}</Text>
              }
            />
            <SettingsRow
              label="Made with care by"
              value="MrDemonWolf, Inc."
            />
          </SettingsSection>

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
