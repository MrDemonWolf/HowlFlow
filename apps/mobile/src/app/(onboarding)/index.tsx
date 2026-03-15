import { View, Text } from "react-native";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg-primary">
      <Text className="text-2xl font-bold text-text-primary">
        Welcome to HowlFlow
      </Text>
      <Text className="mt-2 text-text-secondary">
        Your ADHD-friendly focus companion
      </Text>
    </View>
  );
}
