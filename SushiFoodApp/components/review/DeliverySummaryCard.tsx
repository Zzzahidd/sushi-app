import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function DeliverySummaryCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/review/store.png")}
            style={styles.logo}
          />

          <Text style={styles.store}>
            Sakura Sushi
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            #ORD-8452
          </Text>
        </View>
      </View>

      <Text style={styles.label}>
        Total paid: $23.00
      </Text>

      <Text style={styles.status}>
        Order delivered
      </Text>

      <Image
        source={require("../../assets/images/review/sushi.png")}
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
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

  status: {
    marginTop: 4,
    fontSize: 34,
    fontWeight: "800",
    color: "#222",
  },

  sushi: {
    position: "absolute",
    right: 18,
    bottom: 18,

    width: 70,
    height: 70,
  },
});