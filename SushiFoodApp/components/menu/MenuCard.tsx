import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  item: {
    id: number;
    title: string;
    price: string;
    image: any;
    category: string;
  };

  onPress?: () => void;
}

export default function MenuCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* Favourite */}

      <TouchableOpacity style={styles.favorite}>
        <Ionicons
          name="heart-outline"
          size={18}
          color="#888"
        />
      </TouchableOpacity>

      {/* Image */}

      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.image}
      />

      {/* Category */}

      <Text style={styles.category}>
        {item.category}
      </Text>

      {/* Title */}

      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {item.title}
      </Text>

      {/* Bottom */}

      <View style={styles.bottomRow}>
        <Text style={styles.price}>
          {item.price}
        </Text>

        <TouchableOpacity style={styles.addButton}>
          <Feather
            name="plus"
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 14,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  favorite: {
    position: "absolute",

    top: 12,
    right: 12,

    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },

  image: {
    width: 120,
    height: 120,

    alignSelf: "center",

    marginTop: 10,
  },

  category: {
    marginTop: 12,

    fontSize: 13,

    color: "#999",
  },

  title: {
    marginTop: 5,

    fontSize: 17,

    fontWeight: "700",

    color: "#222",

    lineHeight: 24,

    minHeight: 48,
  },

  bottomRow: {
    marginTop: 16,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  price: {
    fontSize: 18,

    fontWeight: "700",

    color: "#FF6B4A",
  },

  addButton: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "#FF6B4A",

    justifyContent: "center",
    alignItems: "center",
  },
});