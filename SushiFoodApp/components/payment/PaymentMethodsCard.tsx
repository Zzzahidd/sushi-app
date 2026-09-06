import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Feather,
    FontAwesome5,
} from "@expo/vector-icons";

export default function PaymentMethodsCard() {
  const [selected, setSelected] = useState("apple");

  const RadioButton = ({ active }: { active: boolean }) => (
    <View
      style={[
        styles.radioOuter,
        active && styles.radioOuterActive,
      ]}
    >
      {active && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Apple Pay */}

      <TouchableOpacity
        style={styles.row}
        onPress={() => setSelected("apple")}
      >
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <FontAwesome5
              name="apple-pay"
              size={26}
              color="#111"
            />
          </View>

          <Text style={styles.title}>
            Apple Pay
          </Text>
        </View>

        <RadioButton
          active={selected === "apple"}
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Mastercard */}

      <TouchableOpacity
        style={styles.row}
        onPress={() => setSelected("master")}
      >
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/payment/mastercard.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            xxxx-9010
          </Text>
        </View>

        <RadioButton
          active={selected === "master"}
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Add Card */}

      <TouchableOpacity
        style={styles.row}
        onPress={() => setSelected("new")}
      >
        <View style={styles.left}>
          <View style={styles.iconBox}>
            <Feather
              name="plus-circle"
              size={22}
              color="#222"
            />
          </View>

          <Text style={styles.title}>
            Add new card
          </Text>
        </View>

        <RadioButton
          active={selected === "new"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  row: {
    height: 72,

    paddingHorizontal: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  left: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconBox: {
    width: 34,
    alignItems: "center",
  },

  cardImage: {
    width: 28,
    height: 28,
    marginRight: 10,
  },

  title: {
    marginLeft: 12,

    fontSize: 17,

    fontWeight: "600",

    color: "#222",
  },

  divider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginHorizontal: 18,
  },

  radioOuter: {
    width: 22,
    height: 22,

    borderRadius: 11,

    borderWidth: 2,

    borderColor: "#BDBDBD",

    justifyContent: "center",

    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: "#FF5A36",
  },

  radioInner: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#FF5A36",
  },
});