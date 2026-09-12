import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

interface Props {
  item: any;
  index?: number;
  onPress: () => void;
  onAddToCart?: () => void;
}

export default function SushiCard({ item, index, onPress, onAddToCart }: Props) {
  const [isFavorite, setIsFavorite] = useState(item.favorite || false);

  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const plusScale = useSharedValue(1);

  const handlePressIn = () => {
    cardScale.value = withSpring(0.96, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const toggleFavorite = (e: any) => {
    e?.stopPropagation?.();
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setIsFavorite(!isFavorite);
    heartScale.value = withSequence(
      withTiming(1.35, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 250 })
    );
  };

  const handleAdd = (e: any) => {
    e?.stopPropagation?.();
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}

    plusScale.value = withSequence(
      withTiming(0.8, { duration: 80 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );

    if (onAddToCart) {
      onAddToCart();
    } else {
      onPress();
    }
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const animatedPlusStyle = useAnimatedStyle(() => ({
    transform: [{ scale: plusScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.name || item.title}, price $${item.price || "16"}, rating ${item.rating || "4.8"} stars, preparation time ${item.time || "20 mins"}`}
        accessibilityHint="Opens product details"
        onPress={() => {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch {}
          onPress();
        }}
        style={styles.cardInner}
      >
        {/* Top Badges: Discount & Heart */}
        <View style={styles.topRow}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>20% OFF</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleFavorite}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
            style={styles.heartBtn}
          >
            <Animated.View style={animatedHeartStyle}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? "#FF6B4A" : "#8E8E93"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Dish Image */}
        <View style={styles.imageWrapper}>
          <Image source={item.image} resizeMode="contain" style={styles.image} />
        </View>

        {/* Dish Title */}
        <Text numberOfLines={1} style={styles.title}>
          {item.name || item.title}
        </Text>

        {/* Meta Row: Rating & Time */}
        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating || "4.8"}</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.timeBadge}>
            <Feather name="clock" size={12} color="#8E8E93" />
            <Text style={styles.timeText}>{item.time || "20 min"}</Text>
          </View>
        </View>

        {/* Price & Add to Cart Button */}
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${typeof item.price === "string" ? item.price.replace("$", "") : item.price || 16}
            </Text>
            <Text style={styles.oldPrice}>
              ${(typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 16 : Number(item.price) || 16) + 4}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAdd}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.name || item.title} to cart`}
            style={styles.addBtn}
          >
            <Animated.View style={animatedPlusStyle}>
              <Feather name="plus" size={18} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  cardInner: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountBadge: {
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountText: {
    color: "#FF6B4A",
    fontSize: 10,
    fontWeight: "700",
  },
  heartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  dot: {
    marginHorizontal: 5,
    color: "#C7C7CC",
    fontSize: 12,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  timeText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C1C1E",
  },
  oldPrice: {
    fontSize: 12,
    color: "#AEAEB2",
    textDecorationLine: "line-through",
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6B4A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
});