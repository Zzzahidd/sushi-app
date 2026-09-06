import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomPlaceOrder() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Total */}

      <View style={styles.priceContainer}>
        <Text style={styles.label}>
          Total
        </Text>

        <Text style={styles.price}>
          $23.00
        </Text>
      </View>

      {/* Button */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>
          Place Order
        </Text>

        <Feather
          name="arrow-right"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 40,
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 18,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },

  price: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FF5A36",
  },

  button: {
    height: 60,

    borderRadius: 30,

    backgroundColor: "#FF5A36",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#FF5A36",

    shadowOpacity: 0.35,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "700",

    marginRight: 10,
  },
});