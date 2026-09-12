import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useRef, useState, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import BottomCheckout from "../components/details/BottomCheckout";
import CategoryChips from "../components/details/CategoryChips";
import DetailsHeader from "../components/details/DetailsHeader";
import ProductInfoCard from "../components/details/ProductInfoCard";
import RelatedProductCard from "../components/details/RelatedProductCard";
import { relatedProducts } from "../data/relatedProducts";

const DEFAULT_IMAGE = require("../assets/images/sushi/sushi1.png");

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    price?: string;
    image?: string;
  }>();

  const scrollViewRef = useRef<ScrollView>(null);

  const initialPrice = params.price ? parseFloat(params.price.replace("$", "")) || 18 : 18;
  const initialTitle = params.title || "Sakura Sushi Platter";

  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [currentImage, setCurrentImage] = useState(DEFAULT_IMAGE);
  const [selectedCategory, setSelectedCategory] = useState("Nigiri");

  useEffect(() => {
    if (params.title) {
      setCurrentTitle(params.title);
    }
    if (params.price) {
      setCurrentPrice(parseFloat(params.price.replace("$", "")) || 18);
    }
  }, [params.title, params.price]);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const handleSelectRelatedProduct = (item: (typeof relatedProducts)[0]) => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentTitle(item.title);
    setCurrentPrice(parseFloat(item.price.replace("$", "")) || 18);
    setCurrentImage(item.image);

    // Smooth scroll to top to see newly selected dish
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const priceStr = `$${currentPrice.toFixed(2)}`;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4EF" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header with Hero Image & Back / Heart Buttons */}
          <DetailsHeader
            image={currentImage}
            title={currentTitle}
          />

          {/* Product Info Card */}
          <ProductInfoCard
            title={currentTitle}
            price={priceStr}
            rating={4.9}
            reviews="1.4K"
            time="20-25 mins"
            description="Handcrafted daily with ultra-fresh Norwegian salmon, creamy Hass avocado, seasoned Koshihikari sushi rice, and house-made umami glaze. Accompanied by authentic Shizuoka wasabi and pickled ginger."
          />

          {/* Dietary / Preference Chips */}
          <CategoryChips
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Section Header with Working See All Button */}
          <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>You Might Also Like</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                triggerHaptic();
                router.push("/(tabs)/menu" as any);
              }}
              style={styles.seeAllBtn}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="See all sushi dishes in menu"
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Related Dishes with Full Clickability & Animations */}
          <View style={styles.relatedContainer}>
            {relatedProducts.map((item) => (
              <RelatedProductCard
                key={item.id}
                item={item}
                onPress={() => handleSelectRelatedProduct(item)}
                onAddToCart={() => {
                  triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
                  router.push("/(tabs)/cart" as any);
                }}
              />
            ))}
          </View>
        </ScrollView>

        {/* Floating Bottom Checkout Bar */}
        <BottomCheckout
          price={currentPrice}
          onAddToCart={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
            router.push("/(tabs)/cart" as any);
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    paddingBottom: 130,
  },
  sectionHeader: {
    marginTop: 26,
    marginBottom: 4,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  relatedContainer: {
    paddingBottom: 30,
  },
});