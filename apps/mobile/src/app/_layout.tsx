import "../../global.css";

import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const HOWLFLOW_DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#00D4FF",
    background: "#0A0E1A",
    card: "#111827",
    text: "#F9FAFB",
    border: "#1F2937",
    notification: "#FFB800",
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit: require("../../assets/fonts/Outfit-Variable.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={HOWLFLOW_DARK_THEME}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen
            name="(dev)/debug"
            options={{
              presentation: "modal",
              headerShown: true,
              title: "Debug Menu",
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
