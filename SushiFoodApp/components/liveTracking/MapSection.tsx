import React from "react";
import {
    Image,
    StyleSheet,
    View,
} from "react-native";

export default function MapSection() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/tracking/map.png")}
        style={styles.map}
      />

      <Image
        source={require("../../assets/images/tracking/pin.png")}
        style={styles.pin}
      />

      <Image
        source={require("../../assets/images/tracking/scooter.png")}
        style={styles.scooter}
      />

      <View style={styles.route1} />
      <View style={styles.route2} />
      <View style={styles.route3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  pin: {
    position: "absolute",
    top: 170,
    left: "55%",

    width: 36,
    height: 36,
  },

  scooter: {
    position: "absolute",
    top: 245,
    left: "28%",

    width: 70,
    height: 70,
  },

  route1: {
    position: "absolute",

    top: 300,
    left: 80,

    width: 120,
    height: 6,

    backgroundColor: "#FF5A36",

    transform: [{ rotate: "45deg" }],
  },

  route2: {
    position: "absolute",

    top: 360,
    left: 110,

    width: 90,
    height: 6,

    backgroundColor: "#FF5A36",

    transform: [{ rotate: "-35deg" }],
  },

  route3: {
    position: "absolute",

    top: 420,
    left: 130,

    width: 70,
    height: 6,

    backgroundColor: "#FF5A36",

    transform: [{ rotate: "30deg" }],
  },
});