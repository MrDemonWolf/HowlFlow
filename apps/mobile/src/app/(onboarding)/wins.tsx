import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { InfoCard } from "@/components/ui/InfoCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

const PREVIEW_LEVELS = [
  { name: "Pup", minXP: 0 },
  { name: "Scout", minXP: 100 },
  { name: "Tracker", minXP: 300 },
  { name: "Hunter", minXP: 600 },
];

export default function WinsPreviewScreen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      step={4}
      title="Level Up Your Wolf"
      subtitle="Complete blocks, run focus sessions, and earn XP to grow from Pup to Lone Wolf Legend."
      nextLabel="Almost There"
      onNext={() => router.push("/(onboarding)/notifications")}
    >
      <View className="gap-4">
        {/* Wolf level cards */}
        <View className="rounded-2xl bg-bg-card p-4">
          {PREVIEW_LEVELS.map((level, i) => (
            <View key={level.name} className={i > 0 ? "mt-3" : ""}>
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-text-primary">
                  {level.name}
                </Text>
                <Text className="text-xs text-text-muted">
                  {level.minXP} XP
                </Text>
              </View>
              <ProgressBar
                value={0}
                label={
                  i < PREVIEW_LEVELS.length - 1
                    ? `0 / ${PREVIEW_LEVELS[i + 1].minXP} XP to ${PREVIEW_LEVELS[i + 1].name}`
                    : undefined
                }
                height={6}
              />
            </View>
          ))}
        </View>

        {/* XP earning methods */}
        <InfoCard
          layout="horizontal"
          iosName="flame.fill"
          iconColor="#0FACED"
          iconBg="rgba(15, 172, 237, 0.1)"
          label="Focus Session"
          subtitle="+15 XP"
        />
        <InfoCard
          layout="horizontal"
          iosName="checkmark.circle.fill"
          iconColor="#34D399"
          iconBg="rgba(52, 211, 153, 0.1)"
          label="Block Complete"
          subtitle="+10 XP"
        />
        <InfoCard
          layout="horizontal"
          iosName="star.fill"
          iconColor="#FBBF24"
          iconBg="rgba(251, 191, 36, 0.1)"
          label="Perfect Day"
          subtitle="+50 XP"
        />
      </View>
    </OnboardingScreen>
  );
}
