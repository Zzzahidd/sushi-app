import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import SushiCard from "../../components/home/SushiCard";
import { sushiData } from "../../constants/homeData";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredItems = sushiData.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search sushi, rolls, bento..."
              value={query}
              onChangeText={setQuery}
              style={styles.input}
              placeholderTextColor="#999"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Feather name="x" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No sushi found</Text>
            </View>
          }
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
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 52,
    borderWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  row: {
    justifyContent: "space-between",
  },
  empty: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
