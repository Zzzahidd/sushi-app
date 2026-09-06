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
    restaurant: string;
    address: string;
    status: string;
    image: any;
  };
}

export default function OrderedItemCard({
  item,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Image */}

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Details */}

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </Text>

        <Text style={styles.address}>
          Delivery · {item.address}
        </Text>

        <Text style={styles.restaurant}>
          From {item.restaurant}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color:
                item.status === "Delivered"
                  ? "#34C759"
                  : "#FF6B4A",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      {/* Track Button */}

      <TouchableOpacity style={styles.trackButton}>
        <Text style={styles.trackText}>
          Track
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    marginHorizontal: 20,

    marginBottom: 18,

    padding: 14,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  image: {
    width: 88,
    height: 88,
  },

  info: {
    flex: 1,

    marginLeft: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  address: {
    marginTop: 8,

    fontSize: 15,

    color: "#8A8A8A",
  },

  restaurant: {
    marginTop: 4,

    fontSize: 15,

    color: "#8A8A8A",
  },

  status: {
    marginTop: 12,

    fontSize: 15,

    fontWeight: "600",
  },

  trackButton: {
    width: 82,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#FF6B4A",

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "flex-end",
  },

  trackText: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "700",
  },
});