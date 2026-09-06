import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function LocationPin() {
  return (
    <>
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>
          Your order will be delivered here
        </Text>
      </View>

      <View style={styles.pin}>
        <Feather
          name="map-pin"
          size={30}
          color="#FFF"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: "absolute",

    top: 270,
    alignSelf: "center",

    backgroundColor: "#FFE4D5",

    paddingHorizontal: 16,
    paddingVertical: 10,

    borderRadius: 12,
  },

  tooltipText: {
    color: "#7A3A12",
    fontWeight: "600",
    fontSize: 14,
  },

  pin: {
    position: "absolute",

    top: 355,
    alignSelf: "center",

    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: "#FF5A36",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },
});