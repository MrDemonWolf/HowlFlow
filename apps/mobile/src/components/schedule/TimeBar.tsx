import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getTimeOfDayLabel } from "@/lib/dates";
import { useSettingsStore } from "@/stores/settingsStore";

function parseHHMM(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h! * 60 + m!;
}

export function TimeBar() {
  const [now, setNow] = useState(new Date());
  const wakeUpTime = useSettingsStore((s) => s.wakeUpTime);
  const windDownTime = useSettingsStore((s) => s.windDownTime);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  const { label, emoji } = getTimeOfDayLabel(hours);

  const nowMinutes = hours * 60 + minutes;
  const wakeMin = parseHHMM(wakeUpTime);
  const windMin = parseHHMM(windDownTime);
  const dayProgress = Math.max(
    0,
    Math.min(1, (nowMinutes - wakeMin) / (windMin - wakeMin))
  );

  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-baseline justify-between mb-1">
        <Text
          className="text-text-primary text-4xl"
          style={{ fontFamily: "JetBrainsMono_700Bold" }}
        >
          {timeStr}
        </Text>
        <Text
          className="text-text-secondary text-sm"
          style={{ fontFamily: "Montserrat_600SemiBold" }}
        >
          {emoji} {label}
        </Text>
      </View>
      <ProgressBar progress={dayProgress} color="#0FACED" height={4} />
    </View>
  );
}
