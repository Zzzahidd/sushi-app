import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import SushiCard from "../../components/home/SushiCard";
import { sushiData } from "../../constants/homeData";

export default function FavoritesScreen() {
  const router = useRouter();
  const favoriteItems = sushiData.filter((item: any) => item.favorite);

  return (
    <>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            {favoriteItems.length} items saved
          </Text>
        </View>

        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SushiCard
              item={item}
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
    backgroundColor: "#F8F8F8",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  row: {
    justifyContent: "space-between",
  },
});
