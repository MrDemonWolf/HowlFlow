import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Configure how notifications are presented when the app is in the foreground.
 * Call this at module level (before React renders).
 */
export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/**
 * Request iOS notification permissions (alert + sound, no badge).
 * Returns true if granted.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();
  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowSound: true,
      allowBadge: false,
    },
  });

  return status === "granted";
}

/**
 * Create the "Focus Timer" notification channel on Android.
 * No-op on iOS.
 */
export async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("focus-timer", {
    name: "Focus Timer",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
  });
}

/**
 * Schedule a local notification for when the focus timer completes.
 * Returns the notification identifier, or null if permissions aren't granted.
 */
export async function scheduleTimerCompleteNotification(
  durationSeconds: number,
  blockTitle?: string
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return null;

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hunt Complete",
      body: blockTitle
        ? `"${blockTitle}" is done. Time for a howl break.`
        : "Your focus session is done. Time for a howl break.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: durationSeconds,
    },
  });

  return identifier;
}

/**
 * Cancel a specific scheduled notification by identifier.
 */
export async function cancelTimerNotification(
  identifier: string
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}

/**
 * Cancel all scheduled notifications. Call on cold start to clear stale ones.
 */
export async function cancelAllTimerNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
