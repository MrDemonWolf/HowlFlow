import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { EmptyState } from "@/components/ui/EmptyState";
import { useHaptics } from "@/hooks/useHaptics";
import { relativeTime } from "@/lib/dates";
import { useDumpStore } from "@/stores/dumpStore";
import type { DumpEntry } from "@/types";

const FILTER_VALUES = ["active", "archived"] as const;
const FILTER_LABELS = ["Active", "Archived"];

export default function DumpScreen() {
  const entries = useDumpStore((s) => s.entries);
  const addEntry = useDumpStore((s) => s.addEntry);
  const archiveEntry = useDumpStore((s) => s.archiveEntry);
  const deleteEntry = useDumpStore((s) => s.deleteEntry);
  const { impact, selection } = useHaptics();
  const [text, setText] = useState("");
  const [filterIndex, setFilterIndex] = useState(0);

  const showArchived = FILTER_VALUES[filterIndex] === "archived";

  const filtered = useMemo(
    () => entries.filter((e) => (showArchived ? e.archived : !e.archived)),
    [entries, showArchived]
  );

  const handleAdd = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addEntry(trimmed);
    setText("");
    Keyboard.dismiss();
    impact();
  }, [text, addEntry, impact]);

  const renderEntry = ({ item }: { item: DumpEntry }) => (
    <View className="mx-4 mb-2 flex-row items-center rounded-xl bg-bg-card p-4">
      <View className="flex-1">
        <Text className="text-base text-text-primary">{item.text}</Text>
        <Text className="mt-1 text-xs text-text-muted">
          {relativeTime(item.createdAt)}
        </Text>
      </View>
      <View className="flex-row gap-2">
        {!item.archived && (
          <TouchableOpacity
            onPress={() => {
              archiveEntry(item.id);
              selection();
            }}
            className="rounded-lg bg-bg-input px-3 py-1.5"
            accessibilityRole="button"
            accessibilityLabel={`Archive: ${item.text}`}
          >
            <Text className="text-xs text-text-secondary">📦</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            deleteEntry(item.id);
            selection();
          }}
          className="rounded-lg bg-bg-input px-3 py-1.5"
          accessibilityRole="button"
          accessibilityLabel={`Delete: ${item.text}`}
        >
          <Text className="text-xs text-wolf-red">✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={renderEntry}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View>
          {/* Input bar */}
          <View className="mx-4 mb-4 mt-2 flex-row gap-2">
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="What's on your mind?"
              placeholderTextColor="#64748B"
              onSubmitEditing={handleAdd}
              returnKeyType="done"
              className="flex-1 rounded-xl bg-bg-card px-4 py-3 text-base text-text-primary"
              accessibilityLabel="Brain dump input"
            />
            <TouchableOpacity
              onPress={handleAdd}
              className="items-center justify-center rounded-xl bg-wolf-blue px-4"
              accessibilityRole="button"
              accessibilityLabel="Add thought"
            >
              <Text className="text-base font-bold text-bg-base">+</Text>
            </TouchableOpacity>
          </View>

          {/* Filter toggle */}
          <View className="mx-4 mb-3">
            <SegmentedControl
              values={FILTER_LABELS}
              selectedIndex={filterIndex}
              onChange={(event) => {
                setFilterIndex(event.nativeEvent.selectedSegmentIndex);
                selection();
              }}
            />
          </View>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          emoji="🧠"
          title={showArchived ? "No archived thoughts" : "Mind is clear!"}
          subtitle={
            showArchived
              ? "Archived entries will appear here"
              : "Dump your thoughts above"
          }
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
