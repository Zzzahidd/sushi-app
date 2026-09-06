import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function RatingCard() {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        How was your experience?
      </Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setRating(item)}
          >
            <Feather
              name={rating >= item ? "star" : "star"}
              size={34}
              color="#FF5A36"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Share your thoughts..."
        placeholderTextColor="#999"
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 18,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  stars: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#FF5A36",
    borderRadius: 16,
    height: 120,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 16,
  },
});