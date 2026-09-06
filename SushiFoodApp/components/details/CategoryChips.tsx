import React, { useState } from "react";
import {
    FlatList,
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

export default function CategoryChips() {
  const [selected, setSelected] = useState("Nigiri");

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
              onPress={() => setSelected(item)}
              style={[
                styles.chip,
                active && styles.activeChip,
              ]}
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
    marginTop: 24,
  },

  list: {
    paddingHorizontal: 20,
  },

  chip: {
    paddingHorizontal: 22,
    paddingVertical: 11,

    marginRight: 12,

    borderRadius: 20,

    backgroundColor: "#F4F4F4",
  },

  activeChip: {
    backgroundColor: "#FF5A36",
  },

  text: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
  },
});