import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

interface Props {
  active?: "home" | "menu" | "orders" | "profile";
}

export default function BottomTabs({
  active = "home",
}: Props) {
  const activeColor = "#FF5A36";
  const inactiveColor = "#8E8E93";

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.item}>
        {active === "home" && <View style={styles.activeLine} />}

        <Ionicons
          name={active === "home" ? "home" : "home-outline"}
          size={24}
          color={active === "home" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "home"
                  ? activeColor
                  : inactiveColor,
            },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Menu */}
      <TouchableOpacity style={styles.item}>
        {active === "menu" && <View style={styles.activeLine} />}

        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={24}
          color={active === "menu" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "menu"
                  ? activeColor
                  : inactiveColor,
            },
          ]}
        >
          Menu
        </Text>
      </TouchableOpacity>

      {/* Orders */}
      <TouchableOpacity style={styles.item}>
        {active === "orders" && <View style={styles.activeLine} />}

        <Feather
          name="file-text"
          size={24}
          color={active === "orders" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "orders"
                  ? activeColor
                  : inactiveColor,
            },
          ]}
        >
          Orders
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity style={styles.item}>
        {active === "profile" && <View style={styles.activeLine} />}

        <Ionicons
          name={
            active === "profile"
              ? "person"
              : "person-outline"
          }
          size={24}
          color={active === "profile" ? activeColor : inactiveColor}
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "profile"
                  ? activeColor
                  : inactiveColor,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  height: 82,
  backgroundColor: "white",

  flexDirection: "row",
  alignItems: "center",

  borderTopWidth: 1,
  borderTopColor: "#EFEFEF",

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: -2,
  },
  elevation: 2,
},

  item: {
  flex: 1,
  height: "100%",

  justifyContent: "center",
  alignItems: "center",
},

  activeLine: {
    position: "absolute",
    top: 0,
    width: 42,
    height: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: "#FF5A36",
  },

  label: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
  },
});