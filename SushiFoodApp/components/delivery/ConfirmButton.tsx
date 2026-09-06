import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

export default function ConfirmButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
    >
      <Text style={styles.text}>
        Confirm Pin Location
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginBottom: 20,

    height: 58,

    borderRadius: 29,

    backgroundColor: "#FF5A36",

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});