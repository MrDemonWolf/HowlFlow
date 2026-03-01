import { Stack } from "expo-router/stack";

import { defaultStackScreenOptions } from "@/lib/stackOptions";

export default function TimerLayout() {
  return (
    <Stack screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: "Timer", headerLargeTitle: false }}
      />
    </Stack>
  );
}
