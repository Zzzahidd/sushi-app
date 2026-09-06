import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <Feather
            name={icon}
            size={20}
            color="#666"
          />
        </View>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      <Feather
        name="chevron-right"
        size={22}
        color="#999"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 82,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#F7F7F7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  subtitle: {
    marginTop: 3,

    fontSize: 15,

    color: "#888",
  },
});