import { View, Text, type ViewProps } from "react-native";
import { clsx } from "clsx";

interface EmptyStateProps extends ViewProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ emoji, title, subtitle, className, ...rest }: EmptyStateProps) {
  return (
    <View className={clsx("flex-1 items-center justify-center p-8", className)} {...rest}>
      <Text className="mb-2 text-4xl">{emoji}</Text>
      <Text className="text-center text-lg font-bold text-text-primary">
        {title}
      </Text>
      {subtitle && (
        <Text className="mt-1 text-center text-sm text-text-secondary">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
