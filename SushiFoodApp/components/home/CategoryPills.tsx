import * as Haptics from "expo-haptics";
import React from "react";
import {
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

import { categories } from "../../constants/homeData";

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <CategoryItem
              key={cat.id}
              item={cat}
              isSelected={isSelected}
              onPress={() => {
                try {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                } catch {}
                onSelectCategory(cat.name);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

function CategoryItem({
  item,
  isSelected,
  onPress,
}: {
  item: any;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.pill, isSelected ? styles.pillSelected : styles.pillDefault]}
      >
        <View
          style={[
            styles.imageCircle,
            isSelected ? styles.imageCircleSelected : styles.imageCircleDefault,
          ]}
        >
          <Image source={item.image} resizeMode="contain" style={styles.catImage} />
        </View>
        <Text
          style={[
            styles.catName,
            isSelected ? styles.catNameSelected : styles.catNameDefault,
          ]}
        >
          {item.name}
        </Text>
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
    gap: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1.5,
  },
  pillDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EFEFEF",
  },
  pillSelected: {
    backgroundColor: "#FF6B4A",
    borderColor: "#FF6B4A",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  imageCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  imageCircleDefault: {
    backgroundColor: "#F8F8F8",
  },
  imageCircleSelected: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  catImage: {
    width: 24,
    height: 24,
  },
  catName: {
    fontSize: 14,
    fontWeight: "700",
  },
  catNameDefault: {
    color: "#1C1C1E",
  },
  catNameSelected: {
    color: "#FFFFFF",
  },
});
