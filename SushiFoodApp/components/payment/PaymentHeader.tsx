import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PaymentHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.back()}
      >
        <Feather
          name="arrow-left"
          size={22}
          color="#222"
        />
      </TouchableOpacity>

      {/* Title */}

      <Text style={styles.title}>
        Checkout
      </Text>

      {/* Empty View for Center Alignment */}

      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

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

    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  placeholder: {
    width: 48,
    height: 48,
  },
});