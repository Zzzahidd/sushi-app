import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function DriverCard() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/tracking/driver.png")}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>Deliverer</Text>
        <Text style={styles.driver}>Alexei Volkov</Text>
      </View>

      <TouchableOpacity style={styles.icon}>
        <Feather name="message-circle" size={20} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon}>
        <Feather name="phone" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  driver: {
    color: "#888",
    marginTop: 4,
  },

  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});