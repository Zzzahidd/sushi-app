import React from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Search Icon */}

      <Feather
        name="search"
        size={22}
        color="#9A9A9A"
      />

      {/* Input */}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search sushi..."
        placeholderTextColor="#A0A0A0"
        style={styles.input}
      />

      {/* Filter Button */}

      <TouchableOpacity style={styles.filterButton}>
        <Ionicons
          name="options-outline"
          size={20}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,

    height: 60,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 18,
    paddingRight: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
  },

  filterButton: {
    width: 46,
    height: 46,

    borderRadius: 15,

    backgroundColor: "#FF6B4A",

    justifyContent: "center",
    alignItems: "center",
  },
});