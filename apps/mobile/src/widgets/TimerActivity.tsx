import { createLiveActivity } from "expo-widgets";
import { Text, HStack, VStack, Spacer, Image } from "@expo/ui/swift-ui";
import {
  foregroundStyle,
  font,
  padding,
  frame,
} from "@expo/ui/swift-ui/modifiers";

interface TimerActivityProps {
  mode: string;
  modeLabel: string;
  timeLeftFormatted: string;
  totalDuration: number;
  sessionsCompleted: number;
  color: string;
}

export const TimerActivity = createLiveActivity<TimerActivityProps>(
  "TimerActivity",
  (props) => ({
    banner: (
      <HStack
        spacing={12}
        modifiers={[
          padding({ horizontal: 16, vertical: 12 }),
          frame({ maxWidth: Infinity }),
        ]}
      >
        <Image
          systemName="timer"
          size={20}
          color={props?.color ?? "#0FACED"}
        />
        <VStack alignment="leading" spacing={2}>
          <Text
            modifiers={[
              font({ size: 13, weight: "medium" }),
              foregroundStyle(props?.color ?? "#0FACED"),
            ]}
          >
            {props?.modeLabel ?? "Focus Time"}
          </Text>
          <Text
            modifiers={[
              font({ size: 11 }),
              foregroundStyle("#94A3B8"),
            ]}
          >
            Session {(props?.sessionsCompleted ?? 0) + 1}
          </Text>
        </VStack>
        <Spacer />
        <Text
          modifiers={[
            font({ size: 28, weight: "bold", design: "monospaced" }),
            foregroundStyle("#F1F5F9"),
          ]}
        >
          {props?.timeLeftFormatted ?? "00:00"}
        </Text>
      </HStack>
    ),

    compactLeading: (
      <Image
        systemName="timer"
        size={14}
        color={props?.color ?? "#0FACED"}
      />
    ),

    compactTrailing: (
      <Text
        modifiers={[
          font({ size: 14, weight: "semibold", design: "monospaced" }),
          foregroundStyle("#F1F5F9"),
        ]}
      >
        {props?.timeLeftFormatted ?? "00:00"}
      </Text>
    ),

    minimal: (
      <Image
        systemName="timer"
        size={12}
        color={props?.color ?? "#0FACED"}
      />
    ),

    expandedCenter: (
      <VStack spacing={4}>
        <Text
          modifiers={[
            font({ size: 13, weight: "medium" }),
            foregroundStyle(props?.color ?? "#0FACED"),
          ]}
        >
          {props?.modeLabel ?? "Focus Time"}
        </Text>
        <Text
          modifiers={[
            font({ size: 36, weight: "bold", design: "monospaced" }),
            foregroundStyle("#F1F5F9"),
          ]}
        >
          {props?.timeLeftFormatted ?? "00:00"}
        </Text>
      </VStack>
    ),

    expandedTrailing: (
      <Text
        modifiers={[
          font({ size: 12 }),
          foregroundStyle("#94A3B8"),
        ]}
      >
        #{(props?.sessionsCompleted ?? 0) + 1}
      </Text>
    ),
  })
);
