import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function OrderStatusCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/tracking/store.png")}
            style={styles.logo}
          />

          <Text style={styles.store}>
            Sakura Sushi
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Preparing Order
          </Text>
        </View>
      </View>

      <Text style={styles.label}>
        Estimated arrival
      </Text>

      <Text style={styles.time}>
        30-49 minutes
      </Text>

      <Image
        source={require("../../assets/images/tracking/sushi.png")}
        style={styles.sushi}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: "#FFF",

    borderRadius: 24,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 5,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 36,
    height: 36,

    marginRight: 12,
  },

  store: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  badge: {
    backgroundColor: "#FFF2EF",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 12,
  },

  badgeText: {
    color: "#FF5A36",

    fontSize: 12,

    fontWeight: "600",
  },

  label: {
    marginTop: 18,

    color: "#888",

    fontSize: 16,
  },

  time: {
    marginTop: 4,

    fontSize: 36,

    fontWeight: "800",

    color: "#222",
  },

  sushi: {
    position: "absolute",

    right: 20,
    bottom: 16,

    width: 70,
    height: 70,
  },
});