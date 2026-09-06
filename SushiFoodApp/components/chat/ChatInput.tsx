import React from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function ChatInput() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type your message..."
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.sendButton}>
        <Feather
          name="send"
          size={22}
          color="#FF5A36"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 20,
    right: 20,
    bottom: 30,

    flexDirection: "row",

    alignItems: "center",
  },

  input: {
    flex: 1,

    height: 54,

    backgroundColor: "#F5F5F5",

    borderRadius: 27,

    paddingHorizontal: 18,

    fontSize: 16,

    marginRight: 12,
  },

  sendButton: {
    width: 54,
    height: 54,

    borderRadius: 27,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },
});