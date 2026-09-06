import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  image: any;
}

export default function DetailsHeader({ image }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background */}

      <View style={styles.background} />

      {/* Back Button */}

      <TouchableOpacity
        style={[styles.circleButton, { left: 20 }]}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#222"
        />
      </TouchableOpacity>

      {/* Favourite */}

      <TouchableOpacity
        style={[styles.circleButton, { right: 20 }]}
      >
        <Ionicons
          name="heart-outline"
          size={23}
          color="#222"
        />
      </TouchableOpacity>

      {/* Main Image */}

      <Image
        source={image}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 275,
    backgroundColor: "#FFF2E9",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  background: {
    position: "absolute",
    width: width,
    height: 275,
    backgroundColor: "#FFF2E9",
  },

  circleButton: {
    position: "absolute",
    top: 55,

    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,

    zIndex: 20,
  },

  image: {
    width: 300,
    height: 220,
    marginBottom: -10,
  },
});