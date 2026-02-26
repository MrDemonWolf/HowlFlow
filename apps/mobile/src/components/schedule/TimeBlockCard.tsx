import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import Animated, {
  FadeInDown,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { BLOCK_TYPE_CONFIG } from "@/lib/constants";
import { formatTime } from "@/lib/dates";
import { tapFeedback, successFeedback } from "@/lib/haptics";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useStatsStore } from "@/stores/statsStore";
import { useTimerStore } from "@/stores/timerStore";
import { BlockTypeBadge } from "./BlockTypeBadge";
import type { DailyBlock } from "@/types";

type TimeBlockCardProps = {
  block: DailyBlock;
  index: number;
};

export function TimeBlockCard({ block, index }: TimeBlockCardProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const toggleBlock = useScheduleStore((s) => s.toggleBlock);
  const toggleSubTask = useScheduleStore((s) => s.toggleSubTask);
  const addSubTask = useScheduleStore((s) => s.addSubTask);
  const recordBlockCompletion = useStatsStore((s) => s.recordBlockCompletion);
  const setLinkedBlock = useTimerStore((s) => s.setLinkedBlock);

  const checkboxScale = useSharedValue(1);
  const checkboxAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  const config = BLOCK_TYPE_CONFIG[block.type];

  const handleToggleBlock = () => {
    if (!block.done) {
      successFeedback();
      recordBlockCompletion();
      checkboxScale.value = withSequence(
        withTiming(1.2, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    } else {
      tapFeedback();
    }
    toggleBlock(block.id);
  };

  const handleToggleTask = (taskId: string, wasDone: boolean) => {
    tapFeedback();
    if (!wasDone) {
      checkboxScale.value = withSequence(
        withTiming(1.2, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    }
    toggleSubTask(block.id, taskId);
  };

  const handleAddTask = () => {
    const text = newTaskText.trim();
    if (!text) return;
    tapFeedback();
    addSubTask(block.id, text);
    setNewTaskText("");
  };

  const handleStartFocus = () => {
    tapFeedback();
    setLinkedBlock(block.id);
    router.push({
      pathname: "/(tabs)/timer",
      params: { blockId: block.id, blockLabel: block.label },
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(300)}
      layout={Layout.duration(200)}
      className="mx-5 mb-3"
    >
      <View
        className={`rounded-2xl p-4 border bg-bg-card ${block.done ? "opacity-60" : ""}`}
        style={{ borderColor: config.border, borderWidth: 1 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center flex-1 mr-3">
            {block.time && (
              <Text
                className="text-text-muted text-xs mr-2"
                style={{ fontFamily: "JetBrainsMono_400Regular" }}
              >
                {formatTime(block.time)}
              </Text>
            )}
            <Text className="text-base mr-1.5">{block.emoji}</Text>
            <Text
              className={`text-text-primary text-base flex-1 ${block.done ? "line-through" : ""}`}
              style={{ fontFamily: "Montserrat_700Bold" }}
              numberOfLines={1}
            >
              {block.label}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <BlockTypeBadge type={block.type} duration={block.duration} />
            <Animated.View style={checkboxAnimStyle}>
              <Pressable
                onPress={handleToggleBlock}
                accessibilityLabel={
                  block.done
                    ? `Mark ${block.label} incomplete`
                    : `Mark ${block.label} complete`
                }
                accessibilityRole="checkbox"
                className="w-7 h-7 rounded-lg border-2 items-center justify-center"
                style={{
                  borderColor: block.done ? config.border : "#5E6F94",
                  backgroundColor: block.done ? config.border : "transparent",
                }}
              >
                {block.done && (
                  <Text className="text-white text-xs">{"\u2713"}</Text>
                )}
              </Pressable>
            </Animated.View>
          </View>
        </View>

        {/* Subtasks (hidden when completed) */}
        {!block.done && block.tasks.length > 0 && (
          <View className="mt-1">
            {block.tasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => handleToggleTask(task.id, task.done)}
                className="flex-row items-center py-1.5"
                accessibilityLabel={
                  task.done ? `Uncheck ${task.text}` : `Check ${task.text}`
                }
                accessibilityRole="checkbox"
              >
                <View
                  className="w-5 h-5 rounded-md border mr-3 items-center justify-center"
                  style={{
                    borderColor: task.done ? "#68d391" : "#5E6F94",
                    backgroundColor: task.done ? "#68d391" : "transparent",
                  }}
                >
                  {task.done && (
                    <Text className="text-white text-xs">{"\u2713"}</Text>
                  )}
                </View>
                <Text
                  className={`text-sm flex-1 ${task.done ? "text-text-muted line-through" : "text-text-secondary"}`}
                  style={{ fontFamily: "Roboto_400Regular" }}
                >
                  {task.text}
                </Text>
              </Pressable>
            ))}

            {/* Inline add task */}
            <View className="flex-row items-center mt-1">
              <TextInput
                className="flex-1 text-text-secondary text-sm py-1.5 px-0"
                style={{ fontFamily: "Roboto_400Regular" }}
                placeholder="Add a task..."
                placeholderTextColor="#5E6F94"
                value={newTaskText}
                onChangeText={setNewTaskText}
                onSubmitEditing={handleAddTask}
                returnKeyType="done"
              />
            </View>
          </View>
        )}

        {/* Focus play button */}
        {!block.done && block.type === "focus" && (
          <Pressable
            onPress={handleStartFocus}
            className="mt-2 flex-row items-center justify-center bg-hunt-orange/15 rounded-lg py-2"
            accessibilityLabel={`Start focus timer for ${block.label}`}
            accessibilityRole="button"
          >
            <Text
              className="text-hunt-orange text-sm"
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              {"\u25B6"} Start Focus
            </Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
