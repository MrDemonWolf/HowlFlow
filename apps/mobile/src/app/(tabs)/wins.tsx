import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WinsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-dark">
      <View className="flex-1 items-center justify-center px-6">
        <Text
          className="text-den-green text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold" }}
        >
          Pack Report
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          Every step counts. Look how far you've come.
        </Text>
      </View>
    </SafeAreaView>
  );
}
