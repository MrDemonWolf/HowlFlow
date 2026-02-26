import { SymbolView, type SymbolViewProps } from "expo-symbols";

type PlatformIconProps = {
  name: SymbolViewProps["name"];
  size?: number;
  tintColor?: string;
  weight?: SymbolViewProps["weight"];
  accessibilityLabel?: string;
};

export function PlatformIcon({
  name,
  size = 24,
  tintColor,
  weight = "regular",
  accessibilityLabel,
}: PlatformIconProps) {
  return (
    <SymbolView
      name={name}
      size={size}
      tintColor={tintColor}
      weight={weight}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
