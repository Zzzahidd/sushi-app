import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { menuProducts } from "../../data/menuProducts";
import MenuCard from "./MenuCard";

export default function PopularSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Popular Dishes
        </Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products */}

      <FlatList
        data={menuProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            onPress={() => router.push("/details")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  header: {
    marginHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    color: "#222",
  },

  seeAll: {
    fontSize: 15,

    fontWeight: "600",

    color: "#FF6B4A",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 18,
  },
});