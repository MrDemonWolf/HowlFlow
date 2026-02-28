interface ScheduleWidgetProps {
  blocksCompleted: number;
  totalBlocks: number;
  progressPercent: number;
  nextBlockLabel: string;
  nextBlockTime: string;
  nextBlockEmoji: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _cached: any = null;

export function getScheduleWidget() {
  if (!_cached) {
    _cached = createScheduleWidget();
  }
  return _cached;
}

function createScheduleWidget() {
  const { createWidget } = require("expo-widgets");
  const { Text, HStack, VStack, Spacer } = require("@expo/ui/swift-ui");
  const {
    foregroundStyle,
    font,
    frame,
    padding,
    cornerRadius,
    background,
  } = require("@expo/ui/swift-ui/modifiers");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function SmallWidget(props: any) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function MediumWidget(props: any) {
    return (
      <HStack
        spacing={16}
        modifiers={[padding({ all: 12 }), frame({ maxWidth: Infinity, maxHeight: Infinity })]}
      >
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

  return createWidget(
    "ScheduleWidget",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any) => {
      if (props.family === "systemSmall") {
        return <SmallWidget {...props} />;
      }
      return <MediumWidget {...props} />;
    }
  );
}
