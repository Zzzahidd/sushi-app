import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import StatsCard from "./StatsCard";

export default function UserCard() {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image
          source={require("../../assets/images/profile/avatar.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          M. Takahashi
        </Text>

        <TouchableOpacity style={styles.edit}>
          <Text style={styles.editText}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.stats}>
        <StatsCard
          number="45"
          label="Orders"
        />

        <StatsCard
          number="12"
          label="Favorites"
        />

        <StatsCard
          number="5"
          label="Vouchers"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: "#FFF",

    borderRadius: 24,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 5,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

  name: {
    flex: 1,

    marginLeft: 14,

    fontSize: 28,

    fontWeight: "700",

    color: "#222",
  },

  edit: {
    backgroundColor: "#FFF1EF",

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 20,
  },

  editText: {
    color: "#FF5A36",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 20,
  },

  stats: {
    flexDirection: "row",
  },
});