import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-bg-dark"
      style={{ flex: 1, backgroundColor: "#091533" }}
    >
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}
      >
        <Text
          className="text-wolf-blue text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold", color: "#0FACED", fontSize: 30, marginBottom: 8 }}
        >
          Schedule
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular", color: "#94A3C8", fontSize: 16, textAlign: "center" }}
        >
          Your daily trail awaits. Block your time, conquer the day.
        </Text>
      </View>
    </SafeAreaView>
  );
}
