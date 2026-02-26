import { View, Text } from "react-native";
import { BLOCK_TYPE_CONFIG } from "@/lib/constants";
import type { BlockType } from "@/types";

type BlockTypeBadgeProps = {
  type: BlockType;
  duration: number;
};

export function BlockTypeBadge({ type, duration }: BlockTypeBadgeProps) {
  const config = BLOCK_TYPE_CONFIG[type];

  return (
    <View
      className="flex-row items-center rounded-full px-2.5 py-1"
      style={{ backgroundColor: config.bg }}
    >
      <Text
        className="text-xs"
        style={{ fontFamily: "Montserrat_600SemiBold", color: config.border }}
      >
        {config.label} {"\u00B7"} {duration}m
      </Text>
    </View>
  );
}
