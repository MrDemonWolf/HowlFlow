import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
  className?: string;
};

export function ProgressBar({
  progress,
  color = "#0FACED",
  height = 6,
  className = "",
}: ProgressBarProps) {
  const animatedProgress = useDerivedValue(() =>
    withTiming(Math.max(0, Math.min(1, progress)), { duration: 400 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%` as `${number}%`,
  }));

  return (
    <View
      className={`rounded-full overflow-hidden bg-text-dim/20 ${className}`}
      style={{ height }}
    >
      <Animated.View
        style={[
          {
            height,
            borderRadius: height / 2,
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
