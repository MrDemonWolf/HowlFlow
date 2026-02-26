import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { tapFeedback } from "@/lib/haptics";

export function QuickActions() {
  return (
    <View className="flex-row gap-3 px-5 mb-4">
      <Pressable
        className="flex-1 bg-hunt-orange/15 border border-hunt-orange/30 rounded-xl p-4"
        onPress={() => {
          tapFeedback();
          router.push("/(tabs)/timer");
        }}
        accessibilityLabel="Start a focus hunt"
        accessibilityRole="button"
      >
        <Text className="text-2xl mb-1">{"\u{1F3AF}"}</Text>
        <Text
          className="text-hunt-orange text-sm"
          style={{ fontFamily: "Montserrat_700Bold" }}
        >
          Focus Hunt
        </Text>
        <Text
          className="text-text-muted text-xs mt-0.5"
          style={{ fontFamily: "Roboto_400Regular" }}
        >
          Start a timer
        </Text>
      </Pressable>
      <Pressable
        className="flex-1 bg-wolf-purple/15 border border-wolf-purple/30 rounded-xl p-4"
        onPress={() => {
          tapFeedback();
          router.push("/(tabs)/dump");
        }}
        accessibilityLabel="Open brain dump"
        accessibilityRole="button"
      >
        <Text className="text-2xl mb-1">{"\u{1F9E0}"}</Text>
        <Text
          className="text-wolf-purple text-sm"
          style={{ fontFamily: "Montserrat_700Bold" }}
        >
          Brain Dump
        </Text>
        <Text
          className="text-text-muted text-xs mt-0.5"
          style={{ fontFamily: "Roboto_400Regular" }}
        >
          Capture a thought
        </Text>
      </Pressable>
    </View>
  );
}
