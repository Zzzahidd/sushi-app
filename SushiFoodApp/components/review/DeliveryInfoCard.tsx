import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function DeliveryInfoCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>123 Tokyo Lane</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivered at</Text>
        <Text style={styles.value}>08:45 AM</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.driverRow}>
        <Image
          source={require("../../assets/images/review/driver.png")}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.driverTitle}>
            Delivered by
          </Text>

          <Text style={styles.driverName}>
            Alexei Volkov
          </Text>
        </View>

        <TouchableOpacity style={styles.icon}>
          <Feather
            name="message-circle"
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Feather
            name="phone"
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 18,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },

  value: {
    fontSize: 17,
    color: "#777",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 8,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  driverTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  driverName: {
    color: "#888",
    marginTop: 2,
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});