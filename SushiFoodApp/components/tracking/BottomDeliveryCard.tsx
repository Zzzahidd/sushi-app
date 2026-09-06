import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function BottomDeliveryCard() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather
          name="home"
          size={20}
          color="#FF5A36"
        />
      </View>

      <View>
        <Text style={styles.label}>
          Delivering to
        </Text>

        <Text style={styles.address}>
          Home, Expected in 25 mins
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 20,
    right: 20,
    bottom: 30,

    backgroundColor: "#FFF",

    borderRadius: 22,

    padding: 18,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 5,
  },

  icon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFF3EA",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 14,
  },

  label: {
    color: "#999",
    fontSize: 14,
  },

  address: {
    marginTop: 4,

    fontSize: 20,

    fontWeight: "700",

    color: "#222",
  },
});