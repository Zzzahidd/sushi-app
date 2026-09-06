import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ReviewHeader() {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Feather
          name="x"
          size={24}
          color="#222"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Enjoy your meal!
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginLeft: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  title: {
    marginTop: 24,
    marginHorizontal: 20,

    fontSize: 30,

    fontWeight: "700",

    color: "#222",
  },
});