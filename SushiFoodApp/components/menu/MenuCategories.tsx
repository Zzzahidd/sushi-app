import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { menuCategories } from "../../data/menuCategories";

export default function MenuCategories() {
  const [selected, setSelected] = useState("Nigiri");

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={menuCategories}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const active = selected === item.title;

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setSelected(item.title)}
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
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },

  chip: {
    height: 42,

    paddingHorizontal: 18,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  activeChip: {
    backgroundColor: "#FF5A36",
  },

  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7B7B7B",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});