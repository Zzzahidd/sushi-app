import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function PriceSummary() {
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Checkout
        </Text>

        <Text style={styles.time}>
          30–45 mins
        </Text>
      </View>

      {/* Divider */}

      <View style={styles.divider} />

      {/* Subtotal */}

      <View style={styles.row}>
        <Text style={styles.label}>
          Subtotal
        </Text>

        <Text style={styles.value}>
          $26.50
        </Text>
      </View>

      {/* Delivery */}

      <View style={styles.row}>
        <Text style={styles.label}>
          Delivery Fee
        </Text>

        <Text style={styles.value}>
          $2.50
        </Text>
      </View>

      {/* Discount */}

      <View style={styles.row}>
        <Text style={styles.label}>
          Discount
        </Text>

        <Text style={styles.discount}>
          -$6.00
        </Text>
      </View>

      {/* Divider */}

      <View style={styles.divider} />

      {/* Total */}

      <View style={styles.row}>
        <Text style={styles.totalText}>
          Total
        </Text>

        <Text style={styles.totalPrice}>
          $23.00
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  time: {
    fontSize: 15,
    color: "#888",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    fontSize: 16,
    color: "#777",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  discount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#34C759",
  },

  totalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FF6B4A",
  },
});