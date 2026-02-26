import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor="#0FACED"
      minimizeBehavior="onScrollDown"
      sidebarAdaptable={true}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "calendar", selected: "calendar.circle.fill" }}
        />
        <NativeTabs.Trigger.Label>Schedule</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="timer">
        <NativeTabs.Trigger.Icon
          sf={{ default: "timer", selected: "timer.circle.fill" }}
        />
        <NativeTabs.Trigger.Label>Timer</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="dump">
        <NativeTabs.Trigger.Icon
          sf={{
            default: "brain.head.profile",
            selected: "brain.head.profile.fill",
          }}
        />
        <NativeTabs.Trigger.Label>Dump</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="wins">
        <NativeTabs.Trigger.Icon
          sf={{ default: "trophy", selected: "trophy.fill" }}
        />
        <NativeTabs.Trigger.Label>Wins</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
