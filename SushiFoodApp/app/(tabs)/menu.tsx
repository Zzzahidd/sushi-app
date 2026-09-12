import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryPills from "../../components/home/CategoryPills";
import SearchHeader from "../../components/home/SearchHeader";
import SectionHeader from "../../components/home/SectionHeader";
import MenuCard from "../../components/menu/MenuCard";
import OfferBanner from "../../components/menu/OfferBanner";
import { menuProducts } from "../../data/menuProducts";

export default function MenuScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? menuProducts
      : menuProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

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
        {/* Top Header */}
        <Animated.View entering={FadeInDown.duration(300)}>
          <View style={styles.header}>
            <SectionHeader
              title="Explore Menu"
              subtitle="Handcrafted with premium ingredients"
            />
          </View>
          <SearchHeader onFilterPress={() => router.push("/(tabs)/search" as any)} />
        </Animated.View>

        {/* Promo Banner */}
        <Animated.View entering={FadeInDown.delay(100).duration(300)}>
          <OfferBanner />
        </Animated.View>

        {/* Category Filter Pills */}
        <Animated.View entering={FadeInDown.delay(150).duration(300)} style={{ marginTop: 20 }}>
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Animated.View>

        {/* Products Grid */}
        <Animated.View entering={FadeInDown.delay(200).duration(300)}>
          <SectionHeader
            title={`${selectedCategory === "All" ? "All Sushi" : selectedCategory} (${filteredProducts.length})`}
          />

          <View style={styles.grid}>
            {filteredProducts.map((item) => (
              <MenuCard
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
  header: {
    paddingTop: 10,
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