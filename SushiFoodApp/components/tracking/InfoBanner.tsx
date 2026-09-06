import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function InfoBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        👍 Sakura Sushi is preparing your order.
        Fresh rolls are on the way!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: "#FFF3EA",

    borderRadius: 18,

    padding: 18,
  },

  text: {
    color: "#777",

    fontSize: 16,

    lineHeight: 24,
  },
});