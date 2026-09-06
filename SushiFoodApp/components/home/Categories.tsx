import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";

import { categories } from "../../constants/homeData";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            selected={selected === index}
            onPress={() => setSelected(index)}
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

  list: {
    paddingHorizontal: 20,
    paddingRight: 5,
  },
});