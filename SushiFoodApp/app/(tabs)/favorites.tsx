import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SushiCard from "../../components/home/SushiCard";
import { sushiData } from "../../constants/homeData";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(sushiData.filter((item: any) => item.favorite));

  const triggerHaptic = () => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (_) {}
  };

  return (
    <>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Saved Dishes</Text>
            <Text style={styles.subtitle}>
              {favorites.length} delicious sushi items bookmarked
            </Text>
          </View>
          <View style={styles.heartCircle}>
            <Ionicons name="heart" size={22} color="#FF6B4A" />
          </View>
        </View>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Animated.View entering={FadeInDown.duration(400)} style={styles.emptyContainer}>
              <View style={styles.emptyCircle}>
                <Ionicons name="heart-outline" size={48} color="#FF6B4A" />
              </View>
              <Text style={styles.emptyTitle}>No Favorites Yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on any sushi dish in the menu to save your favorite dishes here!
              </Text>
              <TouchableOpacity
                style={styles.exploreBtn}
                onPress={() => {
                  triggerHaptic();
                  router.push("/(tabs)/home" as any);
                }}
              >
                <Text style={styles.exploreBtnText}>Explore Menu</Text>
              </TouchableOpacity>
            </Animated.View>
          }
          renderItem={({ item, index }) => (
            <SushiCard
              item={item}
              index={index}
              onPress={() => router.push("/details" as any)}
            />
          )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 3,
  },
  heartCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 130,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 30,
  },
  emptyCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#71717A",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreBtn: {
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 18,
  },
  exploreBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
