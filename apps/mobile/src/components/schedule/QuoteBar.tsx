import { View, Text } from "react-native";
import { WOLF_QUOTES } from "@/lib/constants";
import { useSettingsStore } from "@/stores/settingsStore";
import { getToday } from "@/lib/dates";

function getDailyQuote(): string {
  const today = getToday();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  return WOLF_QUOTES[Math.abs(hash) % WOLF_QUOTES.length]!;
}

export function QuoteBar() {
  const wolfQuotesEnabled = useSettingsStore((s) => s.wolfQuotesEnabled);

  if (!wolfQuotesEnabled) return null;

  return (
    <View className="mx-5 mb-4 px-4 py-3 rounded-xl bg-wolf-blue/10 border border-wolf-glow/20">
      <Text
        className="text-wolf-glow text-sm italic text-center"
        style={{ fontFamily: "Roboto_400Regular" }}
      >
        {getDailyQuote()}
      </Text>
    </View>
  );
}
