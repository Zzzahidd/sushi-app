import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function OrderSummaryCard() {
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>
      {/* Product */}

      <View style={styles.top}>
        <Image
          source={require("../../assets/images/orders/salmon-nigiri.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            Salmon Nigiri Set
          </Text>

          <Text style={styles.description}>
            Delicious salmon nigiri with fresh wasabi
          </Text>
        </View>

        <Text style={styles.price}>
          $12.50
        </Text>
      </View>

      {/* Quantity */}

      <View style={styles.quantityRow}>
        <View style={styles.quantity}>
          <TouchableOpacity
            onPress={() =>
              qty > 1 && setQty(qty - 1)
            }
          >
            <Feather
              name="minus"
              size={18}
              color="#555"
            />
          </TouchableOpacity>

          <Text style={styles.qty}>
            {qty}
          </Text>

          <TouchableOpacity
            onPress={() => setQty(qty + 1)}
          >
            <Feather
              name="plus"
              size={18}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}

      <View style={styles.line} />

      {/* Bottom */}

      <View style={styles.bottom}>
        <Text style={styles.items}>
          Total 2 items
        </Text>

        <Text style={styles.total}>
          $25.00
        </Text>
      </View>

      {/* Button */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,

    backgroundColor: "#FFF",

    borderRadius: 22,

    padding: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 95,
    height: 95,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  description: {
    marginTop: 6,
    color: "#777",
    lineHeight: 22,
    fontSize: 15,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  quantityRow: {
    alignItems: "flex-end",
    marginTop: 14,
  },

  quantity: {
    width: 95,
    height: 38,

    borderRadius: 19,

    backgroundColor: "#F3F3F3",

    flexDirection: "row",

    justifyContent: "space-evenly",

    alignItems: "center",
  },

  qty: {
    fontSize: 17,
    fontWeight: "600",
  },

  line: {
    marginVertical: 18,
    height: 1,
    backgroundColor: "#EFEFEF",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  items: {
    color: "#777",
    fontSize: 15,
  },

  total: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  button: {
    height: 54,

    borderRadius: 27,

    backgroundColor: "#FF6B4A",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});