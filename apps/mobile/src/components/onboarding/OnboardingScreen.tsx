import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OnboardingScreenProps {
  step?: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  nextLabel?: string;
  onNext: () => void;
  skipLabel?: string;
  onSkip?: () => void;
}

export function OnboardingScreen({
  step,
  totalSteps = 3,
  title,
  subtitle,
  children,
  nextLabel = "Next",
  onNext,
  skipLabel = "Skip",
  onSkip,
}: OnboardingScreenProps) {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#091533" }}>
      <View className="flex-1 px-6 pt-8">
        {/* Step indicator */}
        {step != null && (
          <View className="mb-8 flex-row gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <View
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  backgroundColor: i + 1 <= step ? "#0FACED" : "#1A2D5E",
                }}
              />
            ))}
          </View>
        )}

        {/* Content */}
        <Text className="mb-2 text-3xl font-bold text-text-primary">{title}</Text>
        <Text className="mb-8 text-base leading-6 text-text-secondary">{subtitle}</Text>
        {children}
      </View>

      {/* Buttons */}
      <View className="px-6 pb-4">
        <TouchableOpacity
          onPress={onNext}
          className="mb-3 items-center rounded-2xl py-4"
          style={{ backgroundColor: "#0FACED" }}
          accessibilityRole="button"
          accessibilityLabel={nextLabel}
        >
          <Text className="text-lg font-bold" style={{ color: "#091533" }}>
            {nextLabel}
          </Text>
        </TouchableOpacity>

        {onSkip && (
          <TouchableOpacity
            onPress={onSkip}
            className="items-center py-3"
            accessibilityRole="button"
            accessibilityLabel={skipLabel}
          >
            <Text className="text-base text-text-secondary">{skipLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
