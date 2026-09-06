import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

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
    <View style={styles.container}>
      {/* Top Row */}

      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.price}>{price}</Text>
      </View>

      {/* Rating */}

      <View style={styles.ratingRow}>
        <View style={styles.item}>
          <FontAwesome
            name="star"
            size={15}
            color="#FF5A36"
          />

          <Text style={styles.rating}>{rating}</Text>

          <Text style={styles.gray}>
            ({reviews} reviews)
          </Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="time"
            size={15}
            color="#FF5A36"
          />

          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* Description */}

      <Text style={styles.description}>
        {description}
      </Text>

      {/* Tags */}

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Japanese</Text>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Sushi</Text>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Sea Food</Text>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Ramen</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: -45,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF5A36",
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 15,
  },

  gray: {
    marginLeft: 4,
    color: "#888",
    fontSize: 14,
  },

  time: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 15,
    color: "#222",
  },

  description: {
    marginTop: 12,
    color: "#7A7A7A",
    fontSize: 15,
    lineHeight: 22,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },

  tag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 10,
    marginBottom: 8,
  },

  tagText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "500",
  },
});