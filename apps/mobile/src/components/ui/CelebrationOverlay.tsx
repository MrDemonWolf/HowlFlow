import { useEffect } from "react";
import { Text, View } from "react-native";
import { clsx } from "clsx";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  useReducedMotion,
} from "react-native-reanimated";

interface CelebrationOverlayProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  emoji?: string;
  className?: string;
  onDismiss: () => void;
}

export function CelebrationOverlay({
  visible,
  title,
  subtitle,
  emoji = "🎉",
  className,
  onDismiss,
}: CelebrationOverlayProps) {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    if (visible) {
      if (reducedMotion) {
        opacity.value = 1;
        scale.value = 1;
        // Auto dismiss after 2s
        const timer = setTimeout(onDismiss, 2000);
        return () => clearTimeout(timer);
      }

      opacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(2000, withTiming(0, { duration: 300 }, () => {
          runOnJS(onDismiss)();
        }))
      );
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 150 })
      );
    } else {
      opacity.value = 0;
      scale.value = 0.5;
    }
  }, [visible, reducedMotion, onDismiss, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!visible) return null;

  return (
    <View
      className={clsx("absolute inset-0 items-center justify-center", className)}
      style={{ backgroundColor: "rgba(9, 21, 51, 0.85)" }}
      accessibilityRole="alert"
      accessibilityLabel={`${title}. ${subtitle ?? ""}`}
    >
      <Animated.View style={animatedStyle} className="items-center p-8">
        <Text className="mb-4 text-6xl">{emoji}</Text>
        <Text className="text-center text-2xl font-bold text-text-primary">
          {title}
        </Text>
        {subtitle && (
          <Text className="mt-2 text-center text-base text-text-secondary">
            {subtitle}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}
