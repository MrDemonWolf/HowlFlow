import { Stack } from "expo-router/stack";

import { defaultStackScreenOptions } from "@/lib/stackOptions";

export default function WinsLayout() {
  return (
    <Stack screenOptions={defaultStackScreenOptions}>
      <Stack.Screen name="index" options={{ title: "Wins" }} />
    </Stack>
  );
}
