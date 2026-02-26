import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WinsScreen() {
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
          className="text-den-green text-3xl mb-2"
          style={{ fontFamily: "Cinzel_700Bold", color: "#68d391", fontSize: 30, marginBottom: 8 }}
        >
          Pack Report
        </Text>
        <Text
          className="text-text-secondary text-base text-center"
          style={{ fontFamily: "Montserrat_400Regular", color: "#94A3C8", fontSize: 16, textAlign: "center" }}
        >
          Every step counts. Look how far you've come.
        </Text>
      </View>
    </SafeAreaView>
  );
}
