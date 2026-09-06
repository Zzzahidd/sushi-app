import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Feather,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";

export default function DeliveryInfoCard() {
  return (
    <View style={styles.container}>
      {/* Home */}

      <TouchableOpacity style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Feather
              name="home"
              size={20}
              color="#7A7A7A"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>
              Home
            </Text>

            <Text style={styles.subtitle}>
              123 Tokyo Lane
            </Text>
          </View>
        </View>

        <Feather
          name="chevron-right"
          size={22}
          color="#888"
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Phone */}

      <TouchableOpacity style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Feather
              name="phone"
              size={20}
              color="#7A7A7A"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>
              Phone
            </Text>

            <Text style={styles.subtitle}>
              +81 03-4567-8901
            </Text>
          </View>
        </View>

        <Feather
          name="chevron-right"
          size={22}
          color="#888"
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Delivery Time */}

      <TouchableOpacity style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="time-outline"
              size={22}
              color="#7A7A7A"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>
              Delivery Time
            </Text>

            <Text style={styles.subtitle}>
              30–45 mins
            </Text>
          </View>
        </View>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    paddingVertical: 6,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 18,

    paddingVertical: 16,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#F5F5F5",

    justifyContent: "center",

    alignItems: "center",
  },

  info: {
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    marginTop: 4,

    fontSize: 15,

    color: "#8C8C8C",
  },

  divider: {
    height: 1,

    backgroundColor: "#EEEEEE",

    marginHorizontal: 18,
  },
});