import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  FadeOut,
  SlideOutRight,
  useReducedMotion,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useDumpStore } from "@/stores/dumpStore";
import { EmptyState } from "@/components/ui/EmptyState";
import { tapFeedback, successFeedback } from "@/lib/haptics";
import type { BrainDump } from "@/types";

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function SwipeableDumpEntry({
  entry,
  onArchive,
}: {
  entry: BrainDump;
  onArchive: (id: string) => void;
}) {
  const translateX = useSharedValue(0);
  const reducedMotion = useReducedMotion();

  const doArchive = useCallback(() => {
    tapFeedback();
    onArchive(entry.id);
  }, [entry.id, onArchive]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = Math.max(e.translationX, -120);
      }
    })
    .onEnd((e) => {
      if (e.translationX < -80) {
        translateX.value = withTiming(-400, { duration: 200 });
        runOnJS(doArchive)();
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="mx-5 mb-3">
      {/* Archive background */}
      <View className="absolute inset-0 bg-wolf-purple/20 rounded-xl items-end justify-center pr-5">
        <Text
          className="text-wolf-purple text-xs"
          style={{ fontFamily: "Montserrat_600SemiBold" }}
        >
          Archive
        </Text>
      </View>
      <GestureDetector gesture={entry.archived ? Gesture.Pan() : panGesture}>
        <Animated.View
          entering={reducedMotion ? undefined : FadeInDown.duration(200)}
          exiting={reducedMotion ? undefined : SlideOutRight.duration(200)}
          style={entry.archived ? undefined : animStyle}
          className="bg-bg-card rounded-xl p-4 border border-text-dim/10"
        >
          <Text
            className="text-text-primary text-sm mb-2"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            {entry.content}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text
              className="text-text-dim text-xs"
              style={{ fontFamily: "JetBrainsMono_400Regular" }}
            >
              {formatRelativeTime(entry.createdAt)}
            </Text>
            {!entry.archived && (
              <Pressable
                onPress={() => {
                  tapFeedback();
                  onArchive(entry.id);
                }}
                accessibilityLabel={`Archive entry: ${entry.content.slice(0, 30)}`}
                accessibilityRole="button"
              >
                <Text
                  className="text-wolf-purple text-xs"
                  style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                  Archive
                </Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default function DumpScreen() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"active" | "archived">("active");
  const entries = useDumpStore((s) => s.entries);
  const addEntry = useDumpStore((s) => s.addEntry);
  const archiveEntry = useDumpStore((s) => s.archiveEntry);

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      if (filter === "active") return !e.archived;
      return e.archived;
    });
  }, [entries, filter]);

  const handleCapture = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    successFeedback();
    addEntry(trimmed);
    setText("");
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-dark" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View className="px-5 pt-3 pb-2">
          <Text
            className="text-wolf-purple text-2xl"
            style={{ fontFamily: "Cinzel_700Bold" }}
          >
            Brain Dump Den
          </Text>
          <Text
            className="text-text-muted text-sm mt-1"
            style={{ fontFamily: "Roboto_400Regular" }}
          >
            Let it all out. No judgement, just flow.
          </Text>
        </View>

        {/* Input area */}
        <View className="px-5 mb-4">
          <View className="bg-bg-card rounded-xl border border-wolf-purple/20 p-3">
            <TextInput
              className="text-text-primary text-sm min-h-[80px]"
              style={{
                fontFamily: "Roboto_400Regular",
                textAlignVertical: "top",
              }}
              placeholder="What's on your mind..."
              placeholderTextColor="#5E6F94"
              value={text}
              onChangeText={setText}
              multiline
              numberOfLines={3}
            />
            <View className="flex-row justify-end mt-2">
              <Pressable
                onPress={handleCapture}
                disabled={!text.trim()}
                className={`bg-wolf-purple rounded-lg px-4 py-2 ${!text.trim() ? "opacity-40" : ""}`}
                accessibilityLabel="Capture thought"
                accessibilityRole="button"
              >
                <Text
                  className="text-white text-sm"
                  style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                  Capture
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Filter toggle */}
        <View className="flex-row px-5 mb-3 gap-2">
          <Pressable
            onPress={() => {
              tapFeedback();
              setFilter("active");
            }}
            className={`px-4 py-2 rounded-lg ${filter === "active" ? "bg-wolf-purple/20" : "bg-transparent"}`}
            accessibilityLabel="Show active entries"
            accessibilityRole="button"
          >
            <Text
              className={`text-sm ${filter === "active" ? "text-wolf-purple" : "text-text-muted"}`}
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              Active
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              tapFeedback();
              setFilter("archived");
            }}
            className={`px-4 py-2 rounded-lg ${filter === "archived" ? "bg-wolf-purple/20" : "bg-transparent"}`}
            accessibilityLabel="Show archived entries"
            accessibilityRole="button"
          >
            <Text
              className={`text-sm ${filter === "archived" ? "text-wolf-purple" : "text-text-muted"}`}
              style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
              Archived
            </Text>
          </Pressable>
        </View>

        {/* Entries list */}
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SwipeableDumpEntry entry={item} onArchive={archiveEntry} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title={
                filter === "active"
                  ? "Your mind is clear. Nice!"
                  : "No archived entries yet"
              }
              message={
                filter === "active"
                  ? "Capture any thought that pops up. Get it out of your head."
                  : "Archived entries will appear here."
              }
              emoji={filter === "active" ? "\u{1F43A}" : "\u{1F4E6}"}
            />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
