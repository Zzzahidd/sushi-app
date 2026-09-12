import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  price: number;
  onAddToCart?: () => void;
}

export default function BottomCheckout({ price, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const btnScale = useSharedValue(1);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const decrease = () => {
    if (quantity > 1) {
      triggerHaptic();
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    triggerHaptic();
    setQuantity(quantity + 1);
  };

  const handlePressIn = () => {
    btnScale.value = withSpring(0.96, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    btnScale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const animatedBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const total = price * quantity;

  return (
    <View style={styles.container}>
      {/* Quantity Stepper */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.stepButton}
          onPress={decrease}
        >
          <Feather name="minus" size={18} color="#1A1A1A" />
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.stepButton}
          onPress={increase}
        >
          <Feather name="plus" size={18} color="#FF6B4A" />
        </TouchableOpacity>
      </View>

      {/* Add To Cart Button */}
      <Animated.View style={[{ flex: 1 }, animatedBtnStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.cartButton}
          onPress={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
            onAddToCart?.();
          }}
        >
          <Feather name="shopping-bag" size={20} color="#FFFFFF" />
          <Text style={styles.cartText}>Add to Cart • ${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </Animated.View>
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
    paddingTop: 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
    gap: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F5",
    borderRadius: 20,
    paddingHorizontal: 6,
    height: 56,
  },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quantity: {
    marginHorizontal: 14,
    fontSize: 17,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  cartButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 20,
    backgroundColor: "#FF6B4A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    gap: 10,
  },
  cartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});