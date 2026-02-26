import "../global.css";
import { useFonts } from "expo-font";
import {
  Cinzel_600SemiBold,
  Cinzel_700Bold,
  Cinzel_900Black,
} from "@expo-google-fonts/cinzel";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect } from "react";
import { Slot } from "expo-router";
import { Appearance, useColorScheme } from "react-native";
import { colorScheme as nativewindColorScheme } from "react-native-css";
import {
  configureNotificationHandler,
  requestNotificationPermissions,
  cancelAllTimerNotifications,
} from "@/lib/notifications";
import { useSettingsStore } from "@/stores/settingsStore";

SplashScreen.preventAutoHideAsync();

// Seed NativeWind with system color scheme before first render
const systemScheme = Appearance.getColorScheme();
nativewindColorScheme.set(systemScheme === "dark" ? "dark" : "light");

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Cinzel_600SemiBold,
    Cinzel_700Bold,
    Cinzel_900Black,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useLayoutEffect(() => {
    nativewindColorScheme.set(
      colorScheme ?? Appearance.getColorScheme() ?? "light"
    );
  }, [colorScheme]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

      // Bootstrap notifications (fire-and-forget, non-blocking)
      try {
        configureNotificationHandler();
        const { notificationsEnabled } = useSettingsStore.getState();
        if (notificationsEnabled) {
          requestNotificationPermissions();
        }
        cancelAllTimerNotifications();
      } catch {
        // Notifications may not be available in all environments
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
