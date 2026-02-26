import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DumpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-dark">
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-wolf-purple text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold" }}
        >
          Brain Dump
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          Let it all out. No judgement, just flow.
        </Text>
      </View>
    </SafeAreaView>
  );
}
