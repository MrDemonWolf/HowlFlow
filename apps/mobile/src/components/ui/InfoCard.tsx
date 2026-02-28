import { Text, View, type ViewProps } from "react-native";
import { clsx } from "clsx";
import type { SymbolViewProps } from "expo-symbols";

import { IconBadge } from "./IconBadge";

interface InfoCardProps extends ViewProps {
  iosName: SymbolViewProps["name"];
  iconColor: string;
  iconBg: string;
  label: string;
  subtitle?: string;
  layout?: "vertical" | "horizontal";
  children?: React.ReactNode;
}

export function InfoCard({
  iosName,
  iconColor,
  iconBg,
  label,
  subtitle,
  layout = "vertical",
  children,
  className,
  ...rest
}: InfoCardProps) {
  if (layout === "horizontal") {
    return (
      <View className={clsx("flex-row items-center gap-4 rounded-2xl bg-bg-card px-4 py-4", className)} {...rest}>
        <IconBadge iosName={iosName} iconColor={iconColor} backgroundColor={iconBg} />
        <View className="flex-1">
          <Text className="text-base font-semibold text-text-primary">{label}</Text>
          {subtitle && <Text className="text-sm text-text-secondary">{subtitle}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View className={clsx("rounded-2xl bg-bg-card p-4", className)} {...rest}>
      <View className="mb-3 flex-row items-center gap-3">
        <IconBadge iosName={iosName} iconColor={iconColor} backgroundColor={iconBg} />
        <View className="flex-1">
          <Text className="text-base font-semibold text-text-primary">{label}</Text>
          {subtitle && <Text className="text-sm text-text-secondary">{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}
