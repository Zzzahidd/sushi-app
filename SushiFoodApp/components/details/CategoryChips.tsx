import * as Haptics from "expo-haptics";
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  "Nigiri",
  "Sashimi",
  "Maki",
  "Temaki",
  "Bento",
];

interface Props {
  selected?: string;
  onSelect?: (category: string) => void;
}

export default function CategoryChips({
  selected = "Nigiri",
  onSelect,
}: Props) {
  const triggerHaptic = () => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (_) {}
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const active = item === selected;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                onSelect?.(item);
              }}
              style={[
                styles.chip,
                active && styles.activeChip,
              ]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${item} category, ${active ? "selected" : "not selected"}`}
            >
              <Text
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F4F4F5",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeChip: {
    backgroundColor: "#FF6B4A",
    borderColor: "#FF6B4A",
  },
  text: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});