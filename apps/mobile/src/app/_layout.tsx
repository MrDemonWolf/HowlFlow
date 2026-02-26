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
import { Stack } from "expo-router";
import { Appearance, AppState, useColorScheme } from "react-native";
import { colorScheme as nativewindColorScheme } from "react-native-css";
import {
  configureNotificationHandler,
  requestNotificationPermissions,
  cancelAllTimerNotifications,
  scheduleDailyBlockNotifications,
  scheduleMorningReminder,
} from "@/lib/notifications";
import { getToday } from "@/lib/dates";
import { useSettingsStore } from "@/stores/settingsStore";
import { useScheduleStore } from "@/stores/scheduleStore";

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

      // Bootstrap notifications
      try {
        configureNotificationHandler();
        const settings = useSettingsStore.getState();
        if (settings.notificationsEnabled) {
          requestNotificationPermissions();
          scheduleMorningReminder(settings.morningReminderTime);
        }
        cancelAllTimerNotifications();
      } catch {
        // Notifications may not be available in all environments
      }

      // Generate today's blocks on cold start
      const today = getToday();
      useScheduleStore.getState().generateDailyBlocks(today);
      useScheduleStore.getState().cleanOldData(30);

      // Schedule block notifications
      const blocks = useScheduleStore.getState().dailyBlocks[today];
      if (blocks?.length) {
        const { notifyMinutesBefore, notificationsEnabled } =
          useSettingsStore.getState();
        if (notificationsEnabled) {
          scheduleDailyBlockNotifications(blocks, notifyMinutesBefore);
        }
      }
    }
  }, [fontsLoaded]);

  // Day transition: re-generate blocks when app comes to foreground on a new day
  useEffect(() => {
    let lastDate = getToday();

    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        const now = getToday();
        if (now !== lastDate) {
          lastDate = now;
          useScheduleStore.getState().generateDailyBlocks(now);

          // Re-schedule block notifications for the new day
          const blocks = useScheduleStore.getState().dailyBlocks[now];
          const settings = useSettingsStore.getState();
          if (blocks?.length && settings.notificationsEnabled) {
            scheduleDailyBlockNotifications(
              blocks,
              settings.notifyMinutesBefore
            );
          }
        }
      }
    });

    return () => sub.remove();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor:
              colorScheme === "dark" ? "#091533" : "#F4F8FC",
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
