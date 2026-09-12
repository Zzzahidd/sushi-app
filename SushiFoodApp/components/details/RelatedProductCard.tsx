import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Image,
  Platform,
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

interface Props {
  item: {
    id: number;
    title: string;
    image: any;
    rating: number;
    time: string;
    price: string;
    favorite?: boolean;
    description?: string;
  };
  onPress?: () => void;
  onAddToCart?: () => void;
}

export default function RelatedProductCard({
  item,
  onPress,
  onAddToCart,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(item.favorite || false);
  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const addBtnScale = useSharedValue(1);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const handlePressIn = () => {
    cardScale.value = withSpring(0.96, { damping: 15, stiffness: 220 });
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1.0, { damping: 14, stiffness: 180 });
  };

  const toggleFavorite = (e: any) => {
    e?.stopPropagation?.();
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite(!isFavorite);
    heartScale.value = withSequence(
      withTiming(1.4, { duration: 100 }),
      withSpring(1.0, { damping: 8, stiffness: 240 })
    );
  };

  const handleAdd = (e: any) => {
    e?.stopPropagation?.();
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    addBtnScale.value = withSequence(
      withTiming(0.8, { duration: 80 }),
      withSpring(1.0, { damping: 10, stiffness: 260 })
    );
    if (onAddToCart) {
      onAddToCart();
    } else if (onPress) {
      onPress();
    }
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const animatedAddBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addBtnScale.value }],
  }));

  return (
    <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
          onPress?.();
        }}
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}, price ${item.price}, rating ${item.rating} stars`}
        accessibilityHint="Double tap to view dish details"
      >
        {/* Sushi Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.image}
          />

          {/* Favorite Heart Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleFavorite}
            style={styles.favoriteBtn}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
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

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
          </View>

          {/* Info Row (Rating & Time) */}
          <View style={styles.infoRow}>
            <View style={styles.ratingBadge}>
              <FontAwesome name="star" size={13} color="#FFB800" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>

            <View style={styles.dot} />

            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>

          {/* Price and Add Button Row */}
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAdd}
              style={styles.addBtn}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.title} to order`}
            >
              <Animated.View style={animatedAddBtnStyle}>
                <Feather name="plus" size={18} color="#FFFFFF" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#FFF9F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "82%",
    height: 150,
  },
  favoriteBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    padding: 18,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 8,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  time: {
    fontSize: 13,
    color: "#71717A",
    fontWeight: "500",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F4F4F5",
  },
  price: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF6B4A",
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6B4A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
});