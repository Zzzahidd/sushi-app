import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

export default function OrderDetailsButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>
        Order Details
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 28,
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