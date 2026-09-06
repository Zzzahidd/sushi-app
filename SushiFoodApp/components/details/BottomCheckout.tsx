import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  price: number;
  onAddToCart?: () => void;
}

export default function BottomCheckout({
  price,
  onAddToCart,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const total = price * quantity;

  return (
    <View style={styles.container}>
      {/* Quantity */}

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={decrease}
        >
          <Ionicons
            name="remove"
            size={22}
            color="#FF5A36"
          />
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
        >
          <Ionicons
            name="add"
            size={22}
            color="#FF5A36"
          />
        </TouchableOpacity>
      </View>

      {/* Add To Cart */}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCart}
      >
        <Text style={styles.cartText}>
          Add To Cart • ${total.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 20,
    paddingVertical: 18,

    flexDirection: "row",
    alignItems: "center",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 18,
  },

  quantityContainer: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFF4F1",

    borderRadius: 18,

    paddingHorizontal: 10,

    height: 56,
  },

  button: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    elevation: 2,
  },

  quantity: {
    marginHorizontal: 18,

    fontSize: 18,

    fontWeight: "700",

    color: "#222",
  },

  cartButton: {
    flex: 1,

    marginLeft: 16,

    height: 56,

    borderRadius: 18,

    backgroundColor: "#FF5A36",

    justifyContent: "center",
    alignItems: "center",
  },

  cartText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",
  },
});