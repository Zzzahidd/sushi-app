import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PromotionCard() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          Unlock Free Delivery!
        </Text>

        <Text style={styles.subtitle}>
          Get more exclusive deals and discounts.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Explore Now
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../assets/images/tracking/scooter.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,

    borderRadius: 24,

    backgroundColor: "#ECEBFF",

    flexDirection: "row",

    padding: 18,

    alignItems: "center",
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: "#222",
  },

  subtitle: {
    marginTop: 10,

    color: "#777",

    lineHeight: 22,
  },

  button: {
    marginTop: 20,

    width: 120,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFF",

    justifyContent: "center",

    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
    color: "#222",
  },

  image: {
    width: 120,
    height: 120,
  },
});