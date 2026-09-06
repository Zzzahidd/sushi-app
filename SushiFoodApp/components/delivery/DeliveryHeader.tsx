import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DeliveryHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>
        Delivery Address
      </Text>

      <TouchableOpacity style={styles.iconButton}>
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

    backgroundColor: "#FFF",

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
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
});