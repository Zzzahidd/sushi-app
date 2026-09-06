import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  item: any;
  onPress: () => void;
}

export default function SushiCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* Image */}

      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.image}
      />

      {/* Name */}

      <Text style={styles.title}>
        {item.name}
      </Text>

      {/* Bottom */}

      <View style={styles.bottomRow}>
        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={14}
            color="#FF6B4A"
          />

          <Text style={styles.rating}>
            {item.rating}
          </Text>

          <Text style={styles.time}>
            • {item.time}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <Ionicons
            name={
              item.favorite
                ? "heart"
                : "heart-outline"
            }
            size={22}
            color="#FF6B4A"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 165,

    backgroundColor: "#fff",

    borderRadius: 22,

    padding: 14,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  image: {
    width: 120,
    height: 120,

    alignSelf: "center",

    marginTop: 4,

    marginBottom: 12,
  },

  title: {
    fontSize: 20,

    fontWeight: "700",

    color: "#222",

    marginBottom: 10,
  },

  bottomRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  ratingRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  rating: {
    marginLeft: 4,

    fontSize: 15,

    color: "#666",
  },

  time: {
    marginLeft: 4,

    fontSize: 15,

    color: "#888",
  },
});