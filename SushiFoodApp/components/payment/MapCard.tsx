import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function MapCard() {
  return (
    <View style={styles.container}>
      {/* Map */}

      <Image
        source={require("../../assets/images/payment/map.png")}
        style={styles.map}
        resizeMode="cover"
      />

      {/* Location Pin */}

      <View style={styles.pinContainer}>
        <View style={styles.pin}>
          <Feather
            name="map-pin"
            size={28}
            color="#FFFFFF"
          />
        </View>
      </View>

      {/* Edit Pin */}

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>
          Edit Pin
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,

    height: 165,

    borderRadius: 24,

    overflow: "hidden",

    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  pinContainer: {
    position: "absolute",

    top: 28,
    left: 0,
    right: 0,

    alignItems: "center",
  },

  pin: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: "#FF5A36",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF5A36",
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 8,
  },

  editButton: {
    position: "absolute",

    bottom: 18,
    left: "50%",

    marginLeft: -42,

    width: 84,
    height: 34,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  editText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
});