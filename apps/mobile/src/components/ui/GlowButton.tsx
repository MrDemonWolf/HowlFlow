import { Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { clsx } from "clsx";

interface GlowButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
  textColor?: string;
}

export function GlowButton({
  title,
  color = "#0FACED",
  textColor = "#091533",
  className,
  ...rest
}: GlowButtonProps) {
  return (
    <TouchableOpacity
      className={clsx("h-14 items-center justify-center rounded-full", className)}
      style={{
        backgroundColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
      }}
      accessibilityRole="button"
      {...rest}
    >
      <Text className="text-lg font-bold" style={{ color: textColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
