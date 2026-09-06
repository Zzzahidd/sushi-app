import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  number: string;
  label: string;
}

export default function StatsCard({
  number,
  label,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>
        {number}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    marginHorizontal: 6,

    backgroundColor: "#F8F8F8",

    borderRadius: 18,

    height: 82,

    justifyContent: "center",

    alignItems: "center",
  },

  number: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  label: {
    marginTop: 6,

    fontSize: 15,

    color: "#777",
  },
});