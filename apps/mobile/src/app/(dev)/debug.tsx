import { View, Text, ScrollView, Pressable } from "react-native";

const sections = [
  "Notification Tester",
  "Timer Fast-Forward",
  "Widget Inspector",
  "DB Browser",
  "Wolf State Controller",
  "Onboarding Reset",
  "Time Travel",
  "Live Activity Tester",
] as const;

export default function DebugScreen() {
  if (!__DEV__) return null;

  return (
    <ScrollView className="flex-1 bg-bg-primary p-md">
      <Text className="mb-lg text-lg text-text-secondary">
        Development tools for HowlFlow
      </Text>
      {sections.map((section) => (
        <Pressable
          key={section}
          className="mb-sm rounded-md bg-bg-secondary p-md"
        >
          <Text className="text-base font-semibold text-text-primary">
            {section}
          </Text>
          <Text className="mt-xs text-sm text-text-muted">Coming soon</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
