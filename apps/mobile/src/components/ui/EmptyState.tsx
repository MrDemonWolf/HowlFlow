import { View, Text } from "react-native";

type EmptyStateProps = {
  title: string;
  message: string;
  emoji?: string;
};

export function EmptyState({ title, message, emoji }: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-12 px-6">
      {emoji && <Text className="text-5xl mb-4">{emoji}</Text>}
      <Text
        className="text-text-primary text-lg mb-2 text-center"
        style={{ fontFamily: "Montserrat_700Bold" }}
      >
        {title}
      </Text>
      <Text
        className="text-text-muted text-sm text-center"
        style={{ fontFamily: "Roboto_400Regular" }}
      >
        {message}
      </Text>
    </View>
  );
}
