import { createWidget } from "expo-widgets";
import { Text, HStack, VStack, Spacer, Image } from "@expo/ui/swift-ui";
import {
  foregroundStyle,
  font,
  frame,
  padding,
  cornerRadius,
  background,
} from "@expo/ui/swift-ui/modifiers";
import type { WidgetBase } from "expo-widgets";

interface ScheduleWidgetProps {
  blocksCompleted: number;
  totalBlocks: number;
  progressPercent: number;
  nextBlockLabel: string;
  nextBlockTime: string;
  nextBlockEmoji: string;
}

function SmallWidget(props: WidgetBase<ScheduleWidgetProps>) {
  return (
    <VStack
      alignment="leading"
      spacing={8}
      modifiers={[padding({ all: 12 }), frame({ maxWidth: Infinity, maxHeight: Infinity })]}
    >
      <HStack spacing={4}>
        <Text modifiers={[font({ size: 12 }), foregroundStyle("#94A3B8")]}>
          🐺 HowlFlow
        </Text>
      </HStack>

      <Spacer />

      <Text
        modifiers={[
          font({ size: 28, weight: "bold" }),
          foregroundStyle("#F1F5F9"),
        ]}
      >
        {props.blocksCompleted}/{props.totalBlocks}
      </Text>
      <Text modifiers={[font({ size: 12 }), foregroundStyle("#94A3B8")]}>
        blocks done
      </Text>

      <Spacer minLength={4} />

      {/* Progress bar */}
      <VStack modifiers={[frame({ height: 4, maxWidth: Infinity }), cornerRadius(2), background("#1A2D5E")]}>
        <VStack
          modifiers={[
            frame({
              height: 4,
              width: props.progressPercent > 0 ? undefined : 0,
              maxWidth: Infinity,
            }),
            cornerRadius(2),
            background("#0FACED"),
          ]}
        >
          <Text>{""}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
}

function MediumWidget(props: WidgetBase<ScheduleWidgetProps>) {
  return (
    <HStack
      spacing={16}
      modifiers={[padding({ all: 12 }), frame({ maxWidth: Infinity, maxHeight: Infinity })]}
    >
      {/* Left: Progress */}
      <VStack alignment="leading" spacing={4}>
        <HStack spacing={4}>
          <Text modifiers={[font({ size: 12 }), foregroundStyle("#94A3B8")]}>
            🐺 HowlFlow
          </Text>
        </HStack>

        <Spacer />

        <Text
          modifiers={[
            font({ size: 28, weight: "bold" }),
            foregroundStyle("#F1F5F9"),
          ]}
        >
          {props.blocksCompleted}/{props.totalBlocks}
        </Text>
        <Text modifiers={[font({ size: 12 }), foregroundStyle("#94A3B8")]}>
          blocks done
        </Text>

        <Spacer minLength={4} />

        <VStack modifiers={[frame({ height: 4, maxWidth: Infinity }), cornerRadius(2), background("#1A2D5E")]}>
          <VStack
            modifiers={[
              frame({ height: 4, maxWidth: Infinity }),
              cornerRadius(2),
              background("#0FACED"),
            ]}
          >
            <Text>{""}</Text>
          </VStack>
        </VStack>
      </VStack>

      {/* Right: Up Next */}
      <VStack alignment="leading" spacing={4}>
        <Text modifiers={[font({ size: 11, weight: "medium" }), foregroundStyle("#64748B")]}>
          UP NEXT
        </Text>

        <Spacer />

        <Text modifiers={[font({ size: 24 })]}>
          {props.nextBlockEmoji}
        </Text>
        <Text
          modifiers={[
            font({ size: 14, weight: "semibold" }),
            foregroundStyle("#F1F5F9"),
          ]}
        >
          {props.nextBlockLabel}
        </Text>
        <Text modifiers={[font({ size: 12 }), foregroundStyle("#94A3B8")]}>
          {props.nextBlockTime}
        </Text>
      </VStack>
    </HStack>
  );
}

export const ScheduleWidget = createWidget<ScheduleWidgetProps>(
  "ScheduleWidget",
  (props) => {
    if (props.family === "systemSmall") {
      return <SmallWidget {...props} />;
    }
    return <MediumWidget {...props} />;
  }
);
