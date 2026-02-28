import { View, type ViewProps } from "react-native";
import type { SymbolViewProps } from "expo-symbols";

import { PlatformIcon } from "./PlatformIcon";

const SIZES = {
  sm: { box: 32, icon: 16 },
  md: { box: 40, icon: 20 },
  lg: { box: 80, icon: 36 },
} as const;

interface IconBadgeProps extends ViewProps {
  iosName: SymbolViewProps["name"];
  iconColor: string;
  backgroundColor: string;
  shape?: "rounded-xl" | "rounded-full";
  size?: "sm" | "md" | "lg";
}

export function IconBadge({
  iosName,
  iconColor,
  backgroundColor,
  shape = "rounded-xl",
  size = "md",
  style,
  ...rest
}: IconBadgeProps) {
  const { box, icon } = SIZES[size];

  return (
    <View
      className={`items-center justify-center ${shape}`}
      style={[{ width: box, height: box, backgroundColor }, style]}
      {...rest}
    >
      <PlatformIcon iosName={iosName} size={icon} color={iconColor} />
    </View>
  );
}
