import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onFilterPress?: () => void;
}

export default function SearchHeader({ onFilterPress }: Props) {
  const router = useRouter();

  const handleSearchPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.push("/search" as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleSearchPress}
        style={styles.searchBar}
      >
        <Feather name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <Text style={styles.placeholder}>Search sushi, rolls, bento...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch {}
          if (onFilterPress) onFilterPress();
          else router.push("/search" as any);
        }}
        style={styles.filterButton}
      >
        <Feather name="sliders" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 52,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  searchIcon: {
    marginRight: 10,
  },
  placeholder: {
    fontSize: 15,
    color: "#8E8E93",
    fontWeight: "400",
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: "#FF6B4A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
