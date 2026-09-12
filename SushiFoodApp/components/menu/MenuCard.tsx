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
  item: {
    id: number;
    title: string;
    price: string;
    image: any;
    category: string;
    rating?: string | number;
    time?: string;
    favorite?: boolean;
  };
  onPress?: () => void;
  onAddToCart?: () => void;
}

export default function MenuCard({ item, onPress, onAddToCart }: Props) {
  const [isFavorite, setIsFavorite] = useState(item.favorite || false);

  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const addScale = useSharedValue(1);

  const handleToggleFav = (e: any) => {
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
    addScale.value = withSequence(
      withTiming(0.8, { duration: 80 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );
    if (onAddToCart) onAddToCart();
    else if (onPress) onPress();
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const animatedAddStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => (scale.value = withSpring(0.96, { damping: 15 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
        onPress={() => {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch {}
          if (onPress) onPress();
        }}
        style={styles.cardInner}
      >
        {/* Top Badges */}
        <View style={styles.topRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleFav}
            style={styles.favorite}
          >
            <Animated.View style={animatedHeartStyle}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={18}
                color={isFavorite ? "#FF6B4A" : "#8E8E93"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Dish Image */}
        <View style={styles.imageContainer}>
          <Image source={item.image} resizeMode="contain" style={styles.image} />
        </View>

        {/* Dish Title */}
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>

        {/* Rating & Time */}
        <View style={styles.metaRow}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.metaRating}>{item.rating || "4.9"}</Text>
          <Text style={styles.dot}>•</Text>
          <Feather name="clock" size={12} color="#8E8E93" />
          <Text style={styles.metaTime}>{item.time || "18 min"}</Text>
        </View>

        {/* Price & Add */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAdd}
            style={styles.addButton}
          >
            <Animated.View style={animatedAddStyle}>
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
  categoryBadge: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },
  favorite: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
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
    gap: 4,
  },
  metaRating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  dot: {
    color: "#C7C7CC",
    fontSize: 12,
  },
  metaTime: {
    fontSize: 12,
    color: "#8E8E93",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6B4A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
});