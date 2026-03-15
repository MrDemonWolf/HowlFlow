import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Check onboarding state from MMKV store
  // If not onboarded, redirect to (onboarding)
  return <Redirect href="/(tabs)" />;
}
