import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  item: any;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  item,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.activeContainer,
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          selected && styles.activeImage,
        ]}
      >
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <Text
        style={[
          styles.title,
          selected && styles.activeTitle,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 86,
    height: 92,

    backgroundColor: "#fff",

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  activeContainer: {
    backgroundColor: "#FF6B4A",
  },

  imageContainer: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#FFF4F1",

    justifyContent: "center",
    alignItems: "center",
  },

  activeImage: {
    backgroundColor: "#fff",
  },

  image: {
    width: 34,
    height: 34,
  },

  title: {
    marginTop: 8,

    fontSize: 15,

    color: "#222",

    fontWeight: "600",
  },

  activeTitle: {
    color: "#fff",
  },
});