import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function AddressCard() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Feather
            name="map-pin"
            size={20}
            color="#8E8E93"
          />
        </View>

        <View>
          <Text style={styles.label}>
            Address
          </Text>

          <Text style={styles.address}>
            123 Tokyo Lane
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Feather
          name="edit-2"
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    padding: 20,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#F5F5F5",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  label: {
    color: "#9A9A9A",
    fontSize: 14,
  },

  address: {
    marginTop: 4,

    fontSize: 20,
    fontWeight: "700",

    color: "#222",
  },
});