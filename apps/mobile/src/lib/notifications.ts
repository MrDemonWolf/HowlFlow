import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { DailyBlock } from "@/types";

/**
 * Configure how notifications are presented when the app is in the foreground.
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
 */
export async function scheduleTimerCompleteNotification(
  durationSeconds: number,
  blockLabel?: string
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return null;

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hunt Complete",
      body: blockLabel
        ? `"${blockLabel}" is done. Time for a howl break.`
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
 * Cancel all scheduled notifications.
 */
export async function cancelAllTimerNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Schedule notifications for each upcoming block.
 * Fires `notifyMinutesBefore` minutes before block start time.
 */
export async function scheduleDailyBlockNotifications(
  blocks: DailyBlock[],
  notifyMinutesBefore: number
): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Cancel existing block notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();

  for (const block of blocks) {
    if (block.done || !block.time) continue;

    const [h, m] = block.time.split(":").map(Number);
    const blockDate = new Date();
    blockDate.setHours(h!, m!, 0, 0);

    // Subtract notification lead time
    const notifyAt = new Date(
      blockDate.getTime() - notifyMinutesBefore * 60_000
    );

    // Only schedule future notifications
    const secondsUntil = Math.floor(
      (notifyAt.getTime() - now.getTime()) / 1000
    );
    if (secondsUntil <= 0) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${block.emoji} ${block.label}`,
        body: `Starting in ${notifyMinutesBefore} minutes. You've got this, wolf.`,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsUntil,
      },
    });
  }
}

/**
 * Schedule a repeating daily morning reminder.
 */
export async function scheduleMorningReminder(
  time: string
): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const [h, m] = time.split(":").map(Number);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "\uD83D\uDC3A Good morning, wolf",
      body: "Your pack run awaits. Check your schedule.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: h!,
      minute: m!,
      repeats: true,
    },
  });
}
