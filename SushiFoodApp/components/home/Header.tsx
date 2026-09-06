import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Left Section */}

      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#2B2B2B"
          />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={styles.deliveryText}>
            Deliver now
          </Text>

          <View style={styles.row}>
            <Text style={styles.address}>
              123 Tokyo Lane
            </Text>

            <Feather
              name="chevron-down"
              size={18}
              color="#666"
            />
          </View>
        </View>
      </View>

      {/* Right Section */}

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#2B2B2B"
        />

        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,

    paddingHorizontal: 22,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  leftContainer: {
    flexDirection: "row",

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

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 5,
  },

  locationContainer: {
    marginLeft: 12,
  },

  deliveryText: {
    color: "#8A8A8A",

    fontSize: 14,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 2,
  },

  address: {
    fontSize: 22,

    fontWeight: "700",

    color: "#222",

    marginRight: 4,
  },

  dot: {
    position: "absolute",

    right: 14,

    top: 12,

    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: "#FF5A3C",

    borderWidth: 2,

    borderColor: "#FFFFFF",
  },
});