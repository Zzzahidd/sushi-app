import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LiveTrackingHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.back()}
      >
        <Feather
          name="x"
          size={24}
          color="#222"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpText}>
          Help
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,

    flexDirection: "row",
    justifyContent: "space-between",

    zIndex: 100,
  },

  iconButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },

  helpButton: {
    width: 72,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },

  helpText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
});