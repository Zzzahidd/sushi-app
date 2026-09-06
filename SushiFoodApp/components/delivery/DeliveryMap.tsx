import React from "react";
import {
    Image,
    StyleSheet,
} from "react-native";

export default function DeliveryMap() {
  return (
    <Image
      source={require("../../assets/images/delivery/map.png")}
      resizeMode="cover"
      style={styles.map}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 620,
  },
});