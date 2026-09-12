import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
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

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width - 40;

const PROMOS = [
  {
    id: 1,
    tag: "SPECIAL OFFER",
    title: "20% OFF",
    subtitle: "On all Nigiri & Bento combos",
    cta: "Order Now",
    bgColor: "#FF6B4A",
    image: require("../../assets/sushi/sushi1.png"),
  },
  {
    id: 2,
    tag: "WELCOME GIFT",
    title: "Free Delivery",
    subtitle: "On your first 3 sushi orders",
    cta: "Claim Gift",
    bgColor: "#2E7D32",
    image: require("../../assets/sushi/sushi2.png"),
  },
  {
    id: 3,
    tag: "CHEF'S SPECIAL",
    title: "Dragon Roll Set",
    subtitle: "Fresh eel, avocado & unagi sauce",
    cta: "Explore Menu",
    bgColor: "#D97706",
    image: require("../../assets/sushi/dragon.png"),
  },
];

export default function PromoBannerCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / BANNER_WIDTH
    );
    if (slide !== activeIndex && slide >= 0 && slide < PROMOS.length) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH + 14}
        snapToAlignment="center"
      >
        {PROMOS.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            onPress={() => {
              try {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              } catch {}
              router.push("/(tabs)/menu" as any);
            }}
          />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {PROMOS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function PromoCard({ promo, onPress }: { promo: any; onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.94}
        onPressIn={() => (scale.value = withSpring(0.97, { damping: 15 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
        onPress={onPress}
        style={[styles.card, { backgroundColor: promo.bgColor }]}
      >
        <View style={styles.leftContent}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{promo.tag}</Text>
          </View>
          <Text style={styles.title}>{promo.title}</Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {promo.subtitle}
          </Text>

          <View style={styles.ctaButton}>
            <Text style={[styles.ctaText, { color: promo.bgColor }]}>
              {promo.cta}
            </Text>
            <Feather name="arrow-right" size={14} color={promo.bgColor} />
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={promo.image} resizeMode="contain" style={styles.promoImage} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  cardWrapper: {
    width: BANNER_WIDTH,
  },
  card: {
    height: 160,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  leftContent: {
    flex: 1.1,
    justifyContent: "center",
  },
  tagBadge: {
    backgroundColor: "rgba(255,255,255,0.22)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  ctaButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: "700",
  },
  imageContainer: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  promoImage: {
    width: 120,
    height: 120,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#FF6B4A",
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "#E5E5EA",
  },
});
