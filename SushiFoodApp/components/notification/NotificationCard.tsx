import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  time: string;
}

export default function NotificationCard({
  icon,
  title,
  message,
  time,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <Feather
            name={icon}
            size={20}
            color="#FF5A36"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>

      <Text style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 16,

    flexDirection: "row",

    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconCircle: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#FFF2EF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  content: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  message: {
    marginTop: 4,

    fontSize: 16,

    color: "#777",

    lineHeight: 24,
  },

  time: {
    fontSize: 13,

    color: "#999",

    marginLeft: 10,
  },
});