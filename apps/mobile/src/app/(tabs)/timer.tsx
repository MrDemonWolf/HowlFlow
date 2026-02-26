import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-dark">
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-hunt-orange text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold" }}
        >
          Focus Hunt
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          Lock in. The hunt begins when you're ready.
        </Text>
      </View>
    </SafeAreaView>
  );
}
