import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryPills from "../../components/home/CategoryPills";
import LocationHeader from "../../components/home/LocationHeader";
import PromoBannerCarousel from "../../components/home/PromoBannerCarousel";
import SearchHeader from "../../components/home/SearchHeader";
import SectionHeader from "../../components/home/SectionHeader";
import SushiCard from "../../components/home/SushiCard";
import { sushiData } from "../../constants/homeData";
import { relatedProducts } from "../../data/relatedProducts";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Nigiri");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B4A"
            colors={["#FF6B4A"]}
          />
        }
      >
        {/* 1. Location & Notification Top Header */}
        <Animated.View entering={FadeInDown.duration(300)}>
          <LocationHeader />
        </Animated.View>

        {/* 2. Search & Filter Bar */}
        <Animated.View entering={FadeInDown.delay(60).duration(300)}>
          <SearchHeader onFilterPress={() => router.push("/(tabs)/search" as any)} />
        </Animated.View>

        {/* 3. Promo Banner Carousel */}
        <Animated.View entering={FadeInDown.delay(120).duration(300)}>
          <PromoBannerCarousel />
        </Animated.View>

        {/* 4. Category Pills */}
        <Animated.View entering={FadeInDown.delay(180).duration(300)}>
          <SectionHeader
            title="Categories"
            onSeeAll={() => router.push("/(tabs)/menu" as any)}
          />
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Animated.View>

        {/* 5. Popular Sushi Grid */}
        <Animated.View entering={FadeInDown.delay(240).duration(300)}>
          <SectionHeader
            title="Popular Sushi"
            subtitle="Most ordered this week"
            onSeeAll={() => router.push("/(tabs)/menu" as any)}
          />

          <View style={styles.grid}>
            {sushiData.map((item) => (
              <SushiCard
                key={item.id}
                item={item}
                onPress={() => router.push("/details" as any)}
                onAddToCart={() => router.push("/checkout" as any)}
              />
            ))}
          </View>
        </Animated.View>

        {/* 6. Chef's Specials (Horizontal Row) */}
        <Animated.View entering={FadeInDown.delay(300).duration(300)}>
          <SectionHeader
            title="Chef's Specials"
            subtitle="Freshly crafted daily"
            onSeeAll={() => router.push("/(tabs)/menu" as any)}
          />

          <View style={styles.grid}>
            {relatedProducts.map((item) => (
              <SushiCard
                key={item.id}
                item={item}
                onPress={() => router.push("/details" as any)}
                onAddToCart={() => router.push("/checkout" as any)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});