import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-dark">
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-wolf-blue text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold" }}
        >
          Schedule
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          Your daily trail awaits. Block your time, conquer the day.
        </Text>
      </View>
    </SafeAreaView>
  );
}
