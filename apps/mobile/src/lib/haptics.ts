import * as Haptics from "expo-haptics";
import { useSettingsStore } from "@/stores/settingsStore";

function isEnabled(): boolean {
  return useSettingsStore.getState().hapticsEnabled;
}

export function tapFeedback() {
  if (isEnabled()) Haptics.selectionAsync();
}

export function successFeedback() {
  if (isEnabled())
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export function warningFeedback() {
  if (isEnabled())
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}

export function lightFeedback() {
  if (isEnabled()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export function hapticMedium() {
  if (isEnabled()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export function hapticHeavy() {
  if (isEnabled()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}
