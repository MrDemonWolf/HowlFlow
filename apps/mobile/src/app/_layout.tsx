import "../global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { Appearance } from "react-native";
import { colorScheme as nativewindColorScheme } from "react-native-css";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useNotifications } from "@/hooks/useNotifications";
import { useWidgetSync } from "@/hooks/useWidgetSync";
import { defaultStackScreenOptions } from "@/lib/stackOptions";
import { getStoredTheme, useSettingsStore } from "@/stores/settingsStore";

// Read stored theme at MODULE level so NativeWind is seeded before first render.
// MMKV reads are synchronous — no flash of wrong theme.
const storedTheme = getStoredTheme();
const systemScheme = Appearance.getColorScheme();
let initialScheme: "light" | "dark" = "dark";
if (storedTheme === "light") {
  initialScheme = "light";
} else if (storedTheme === "auto") {
  initialScheme = systemScheme === "light" ? "light" : "dark";
}
nativewindColorScheme.set(initialScheme);

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themePreference = useSettingsStore((s) => s.settings.themePreference);
  const onboardingCompleted = useSettingsStore((s) => s.settings.onboardingCompleted);
  useNotifications();
  useWidgetSync();

  useLayoutEffect(() => {
    if (themePreference === "auto") {
      Appearance.setColorScheme("unspecified");
    } else {
      Appearance.setColorScheme(themePreference);
    }
  }, [themePreference]);

  useLayoutEffect(() => {
    nativewindColorScheme.set(colorScheme ?? "dark");
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={defaultStackScreenOptions}>
        <Stack.Protected guard={!onboardingCompleted}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={onboardingCompleted}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              presentation: "modal",
              headerLargeTitle: false,
            }}
          />
        </Stack.Protected>
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
