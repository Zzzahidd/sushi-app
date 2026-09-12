import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  title: string;
  price: string;
  rating: number;
  reviews: string;
  time: string;
  description: string;
}

export default function ProductInfoCard({
  title,
  price,
  rating,
  reviews,
  time,
  description,
}: Props) {
  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.container}>
      {/* Top Title & Price Row */}
      <View style={styles.topRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.chefBadge}>
            <MaterialCommunityIcons name="chef-hat" size={14} color="#FF6B4A" />
            <Text style={styles.chefBadgeText}>Chef Signature</Text>
          </View>
        </View>

        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Rating & Delivery Meta Row */}
      <View style={styles.ratingRow}>
        <View style={styles.metaItem}>
          <FontAwesome name="star" size={16} color="#FFB800" />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewsText}>({reviews} reviews)</Text>
        </View>

        <View style={styles.metaDivider} />

        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color="#FF6B4A" />
          <Text style={styles.timeText}>{time}</Text>
        </View>

        <View style={styles.metaDivider} />

        <View style={styles.metaItem}>
          <Feather name="shield" size={15} color="#10B981" />
          <Text style={styles.safetyText}>100% Fresh</Text>
        </View>
      </View>

      {/* Nutritional Highlights */}
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionPill}>
          <Text style={styles.nutritionValue}>340</Text>
          <Text style={styles.nutritionLabel}>Calories</Text>
        </View>
        <View style={styles.nutritionPill}>
          <Text style={styles.nutritionValue}>24g</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        <View style={styles.nutritionPill}>
          <Text style={styles.nutritionValue}>8g</Text>
          <Text style={styles.nutritionLabel}>Healthy Fats</Text>
        </View>
        <View style={styles.nutritionPill}>
          <Text style={styles.nutritionValue}>Omega-3</Text>
          <Text style={styles.nutritionLabel}>Rich</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Description</Text>
      </View>
      <Text style={styles.description}>{description}</Text>

      {/* Ingredient Tags */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Key Ingredients</Text>
      </View>
      <View style={styles.tagsContainer}>
        {["🍣 Atlantic Salmon", "🥑 Ripe Avocado", "🌾 Sushi Rice", "🥢 Wasabi & Nori", "✨ Sesame"].map(
          (tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          )
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: -40,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  chefBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
    gap: 4,
  },
  chefBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 18,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaDivider: {
    width: 1,
    height: 18,
    backgroundColor: "#E5E7EB",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  reviewsText: {
    fontSize: 12,
    color: "#71717A",
  },
  timeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  safetyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
  nutritionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },
  nutritionPill: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  nutritionValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  nutritionLabel: {
    fontSize: 11,
    color: "#71717A",
    marginTop: 2,
    fontWeight: "500",
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
});