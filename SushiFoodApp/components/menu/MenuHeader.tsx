import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  onSearchPress?: () => void;
}

export default function MenuHeader({
  onSearchPress,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Title */}

      <Text style={styles.title}>
        Menu
      </Text>

      {/* Search Button */}

      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.8}
        onPress={onSearchPress}
      >
        <Feather
          name="search"
          size={22}
          color="#222"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#222",
  },

  searchButton: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },
});