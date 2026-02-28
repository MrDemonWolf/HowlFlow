import { View, Text } from "react-native";

interface ProgressBarProps {
  /** Progress value from 0 to 1 */
  value: number;
  label?: string;
  color?: string;
  height?: number;
}

export function ProgressBar({
  value,
  label,
  color = "#0FACED",
  height = 8,
}: ProgressBarProps) {
  const pct = Math.round(Math.min(1, value) * 100);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      accessibilityLabel={label ?? `${pct}% complete`}
    >
      {label && (
        <Text className="mb-1 text-xs text-text-secondary">{label}</Text>
      )}
      <View
        className="w-full overflow-hidden rounded-full bg-xp-bg"
        style={{ height }}
      >
        <View
          className="rounded-full"
          style={{
            height,
            width: `${pct}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}
