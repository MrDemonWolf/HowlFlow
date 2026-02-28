import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlowButton } from "@/components/ui/GlowButton";
import { useSettingsStore } from "@/stores/settingsStore";

export default function WelcomeScreen() {
  const router = useRouter();
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ backgroundColor: "#091533", paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex-1 items-center justify-center px-6">
        {/* Wolf logo */}
        <View
          className="mb-8 items-center justify-center overflow-hidden rounded-[44px]"
          style={{
            width: 200,
            height: 200,
            borderCurve: 'continuous',
            backgroundColor: "rgba(15, 172, 237, 0.08)",
            borderWidth: 2,
            borderColor: "rgba(15, 172, 237, 0.2)",
            shadowColor: "#0FACED",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 24,
          }}
        >
          <Image
            source={require("../../../assets/images/logo.svg")}
            style={{ width: 160, height: 160 }}
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <Text className="mb-2 text-4xl font-bold text-text-primary">
          HowlFlow
        </Text>

        {/* Subtitle */}
        <Text className="mb-12 text-center text-base leading-6 text-text-secondary">
          Productivity designed for your unique brain.
        </Text>
      </View>

      {/* Bottom actions */}
      <View className="px-6 pb-4">
        <GlowButton
          title="Get Started"
          onPress={() => router.push("/(onboarding)/schedule")}
          className="mb-3"
          accessibilityLabel="Get Started"
        />

        <TouchableOpacity
          onPress={completeOnboarding}
          className="items-center py-3"
          accessibilityRole="button"
          accessibilityLabel="Skip for now"
        >
          <Text className="text-sm text-text-muted">Skip for now</Text>
        </TouchableOpacity>

        <Text className="mt-2 text-center text-xs text-text-muted">
          By continuing, you agree to our Terms of Service.
        </Text>
      </View>
    </View>
  );
}
