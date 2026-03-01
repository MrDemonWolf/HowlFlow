import { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  useReducedMotion,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { ChipSelector } from "@/components/ui/ChipSelector";
import { FrostedCard } from "@/components/ui/FrostedCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { ParticleBG } from "@/components/ui/ParticleBG";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { XPBadge } from "@/components/ui/XPBadge";
import { DOCS_URL } from "@/lib/constants";
import { useSettingsStore } from "@/stores/settingsStore";
import { useStatsStore } from "@/stores/statsStore";

const WAKE_TIMES = [
  "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM",
  "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM",
];

function wakeTimeToHHmm(label: string): string {
  const match = label.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return "07:00";
  let hours = parseInt(match[1], 10);
  const mins = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${mins}`;
}

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const updateSettings = useSettingsStore((s) => s.updateSettings);

  // Award XP on mount
  const addXP = useStatsStore((s) => s.addXP);
  const xpAwarded = useRef(false);
  useEffect(() => {
    if (!xpAwarded.current) {
      xpAwarded.current = true;
      addXP(150);
    }
  }, [addXP]);

  // Wake time state
  const [wakeTime, setWakeTime] = useState("7:00 AM");

  // ─── Entrance animations ───────────────────────────────────────────────────
  const logoOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const logoScale = useSharedValue(reducedMotion ? 1 : 0.85);
  const sparklesOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const badgesOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const xpBadgeTranslateY = useSharedValue(reducedMotion ? 0 : -8);
  const levelBadgeTranslateX = useSharedValue(reducedMotion ? 0 : -12);
  const headlineOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const headlineTranslateY = useSharedValue(reducedMotion ? 0 : 16);
  const cardOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const cardTranslateY = useSharedValue(reducedMotion ? 0 : 12);
  const ctaOpacity = useSharedValue(reducedMotion ? 1 : 0);
  const ctaShadowOpacity = useSharedValue(0.25);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const sparklesStyle = useAnimatedStyle(() => ({
    opacity: sparklesOpacity.value,
  }));
  const xpBadgeStyle = useAnimatedStyle(() => ({
    opacity: badgesOpacity.value,
    transform: [{ translateY: xpBadgeTranslateY.value }],
  }));
  const levelBadgeStyle = useAnimatedStyle(() => ({
    opacity: badgesOpacity.value,
    transform: [{ translateX: levelBadgeTranslateX.value }],
  }));
  const headlineStyle = useAnimatedStyle(() => ({
    opacity: headlineOpacity.value,
    transform: [{ translateY: headlineTranslateY.value }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));
  const ctaStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    shadowOpacity: ctaShadowOpacity.value,
  }));

  useEffect(() => {
    if (reducedMotion) return;

    // 0ms — Logo
    logoOpacity.value = withTiming(1, { duration: 500 });
    logoScale.value = withTiming(1, { duration: 500 });

    // 300ms — Sparkles
    sparklesOpacity.value = withDelay(300, withTiming(1, { duration: 350 }));

    // 400ms — XP badge
    badgesOpacity.value = withDelay(400, withTiming(1, { duration: 300 }));
    xpBadgeTranslateY.value = withDelay(400, withTiming(0, { duration: 300 }));

    // 550ms — Level badge
    levelBadgeTranslateX.value = withDelay(550, withTiming(0, { duration: 300 }));

    // 650ms — Headline
    headlineOpacity.value = withDelay(650, withTiming(1, { duration: 400 }));
    headlineTranslateY.value = withDelay(650, withTiming(0, { duration: 400 }));

    // 800ms — Card
    cardOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(800, withTiming(0, { duration: 400 }));

    // 950ms — CTA
    ctaOpacity.value = withDelay(950, withTiming(1, { duration: 400 }));
    ctaShadowOpacity.value = withDelay(
      1300,
      withRepeat(withTiming(0.35, { duration: 1200 }), -1, true),
    );
  }, [reducedMotion]);

  const handleStart = () => {
    updateSettings({
      wakeUpTime: wakeTimeToHHmm(wakeTime),
      morningReminderTime: wakeTimeToHHmm(wakeTime).replace(
        /^(\d+):(\d+)$/,
        (_, h, m) => {
          const totalMin = parseInt(h, 10) * 60 + parseInt(m, 10) + 30;
          return `${String(Math.floor(totalMin / 60) % 24).padStart(2, "0")}:${String(totalMin % 60).padStart(2, "0")}`;
        },
      ),
    });
    router.push("/(onboarding)/style");
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: "#091533", paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ParticleBG />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo zone — 280x280 relative container */}
        <Animated.View
          style={[logoStyle, { width: 280, height: 280 }]}
          className="mb-4 items-center justify-center"
        >
          {/* SVG glow rings */}
          <View
            style={{ position: "absolute", width: 280, height: 280 }}
            pointerEvents="none"
          >
            <Svg width={280} height={280}>
              <Circle
                cx={140}
                cy={140}
                r={136}
                stroke="rgba(15, 172, 237, 0.12)"
                strokeWidth={1.5}
                fill="none"
              />
              <Circle
                cx={140}
                cy={140}
                r={118}
                stroke="rgba(15, 172, 237, 0.25)"
                strokeWidth={1}
                fill="none"
              />
            </Svg>
          </View>

          {/* Diamond container — rotated 45deg */}
          <View
            style={{
              width: 148,
              height: 148,
              transform: [{ rotate: "45deg" }],
              shadowColor: "#0FACED",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 24,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: 32,
                borderCurve: "continuous",
                overflow: "hidden",
                backgroundColor: "rgba(15, 172, 237, 0.08)",
                borderWidth: 2,
                borderColor: "rgba(15, 172, 237, 0.25)",
              }}
              className="items-center justify-center"
            >
              <Image
                source={require("../../../assets/images/logo.svg")}
                style={{
                  width: 110,
                  height: 110,
                  transform: [{ rotate: "-45deg" }],
                }}
                contentFit="contain"
              />
            </View>
          </View>

          {/* +150 XP badge — top right */}
          <Animated.View
            style={[
              xpBadgeStyle,
              { position: "absolute", top: 18, right: 8 },
            ]}
          >
            <XPBadge xp={150} color="#FBBF24" />
          </Animated.View>

          {/* Level Up! badge — left center */}
          <Animated.View
            style={[
              levelBadgeStyle,
              {
                position: "absolute",
                left: 0,
                top: 140,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 14,
                backgroundColor: "rgba(15, 172, 237, 0.12)",
                borderWidth: 1,
                borderColor: "rgba(15, 172, 237, 0.3)",
              },
            ]}
          >
            <PlatformIcon iosName="trophy.fill" size={12} color="#0FACED" />
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#0FACED" }}>
              LEVEL UP!
            </Text>
          </Animated.View>

          {/* Sparkle decorations */}
          <Animated.View
            style={[sparklesStyle, { position: "absolute", width: 280, height: 280 }]}
            pointerEvents="none"
          >
            <Text style={{ position: "absolute", top: 4, left: 40, fontSize: 14, color: "rgba(251, 191, 36, 0.7)" }}>
              ✦
            </Text>
            <Text style={{ position: "absolute", top: 60, right: 2, fontSize: 10, color: "rgba(15, 172, 237, 0.6)" }}>
              ★
            </Text>
            <Text style={{ position: "absolute", bottom: 30, left: 12, fontSize: 12, color: "rgba(124, 92, 252, 0.6)" }}>
              ✦
            </Text>
            <Text style={{ position: "absolute", bottom: 8, right: 36, fontSize: 16, color: "rgba(52, 211, 153, 0.5)" }}>
              ★
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Two-tone headline + subtitle */}
        <Animated.View style={headlineStyle} className="mb-4 items-center">
          <View className="mb-2 flex-row">
            <Text style={{ fontSize: 36, fontWeight: "800", color: "#FFFFFF" }}>
              Gamify{" "}
            </Text>
            <Text style={{ fontSize: 36, fontWeight: "800", color: "#0FACED" }}>
              Your Focus
            </Text>
          </View>
          <Text className="mb-4 text-center text-base leading-6 text-text-secondary">
            Turn your daily tasks into a hunt. Level up, earn XP, and conquer your day.
          </Text>
        </Animated.View>

        {/* Wake time card */}
        <Animated.View style={cardStyle} className="w-full">
          <FrostedCard>
            <View className="mb-3 flex-row items-center gap-2">
              <Text style={{ fontSize: 18 }}>🌅</Text>
              <View>
                <Text className="text-base font-semibold text-text-primary">
                  When does your hunt begin?
                </Text>
                <Text className="text-xs text-text-secondary">
                  We&apos;ll schedule your Morning Howl around this
                </Text>
              </View>
            </View>
            <ChipSelector
              options={WAKE_TIMES}
              selected={wakeTime}
              onSelect={setWakeTime}
            />
          </FrostedCard>
        </Animated.View>
      </ScrollView>

      {/* CTA + legal footer */}
      <Animated.View
        className="px-6 pb-4"
        style={[
          ctaStyle,
          {
            shadowColor: "#0FACED",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 20,
          },
        ]}
      >
        <GlowButton
          title="Start the Hunt →"
          onPress={handleStart}
          className="mb-3"
          accessibilityLabel="Start the Hunt"
        />

        <Text
          className="mb-3 text-center text-sm text-text-muted"
          onPress={() => router.push("/(onboarding)/style")}
          accessibilityRole="button"
          accessibilityLabel="Set later"
        >
          Set later
        </Text>

        <Text className="text-center text-sm leading-5 text-text-secondary">
          By continuing, you agree to our{" "}
          <Text
            className="text-sm font-medium text-wolf-blue"
            onPress={() => WebBrowser.openBrowserAsync(`${DOCS_URL}/terms`)}
          >
            Terms of Service
          </Text>
          {" "}and{" "}
          <Text
            className="text-sm font-medium text-wolf-blue"
            onPress={() => WebBrowser.openBrowserAsync(`${DOCS_URL}/privacy`)}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </Animated.View>
    </View>
  );
}
