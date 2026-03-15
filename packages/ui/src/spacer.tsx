import { View } from "react-native";
import { spacing } from "@howlflow/core/theme";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpacerProps {
  size: SpacerSize;
  horizontal?: boolean;
}

export function Spacer({ size, horizontal }: SpacerProps) {
  const value = spacing[size];

  return (
    <View
      style={horizontal ? { width: value } : { height: value }}
    />
  );
}
