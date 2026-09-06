import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ContinueButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={() => router.push("/payment" as any)}
    >
      <Text style={styles.text}>
        Continue
      </Text>

      <Feather
        name="arrow-right"
        size={22}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#FF6B4A",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#FF6B4A",

    shadowOpacity: 0.35,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  text: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "700",

    marginRight: 10,
  },
});