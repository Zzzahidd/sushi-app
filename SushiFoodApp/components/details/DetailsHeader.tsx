import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface Props {
  image: any;
  title?: string;
}

export default function DetailsHeader({ image, title = "Sushi" }: Props) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const heartScale = useSharedValue(1);

  const handleToggleFavorite = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    setIsFavorite(!isFavorite);
    heartScale.value = withSequence(
      withTiming(1.35, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 250 })
    );
  };

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.share({
        message: `Check out ${title} on Sushir Bhai! Delicious fresh Japanese sushi delivered fast.`,
      });
    } catch {}
  };

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Top Action Buttons */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.circleButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#1C1C1E" />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.circleButton}
            onPress={handleToggleFavorite}
          >
            <Animated.View style={animatedHeartStyle}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? "#FF6B4A" : "#1C1C1E"}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.circleButton}
            onPress={handleShare}
          >
            <Feather name="share-2" size={20} color="#1C1C1E" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={image} resizeMode="contain" style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 310,
    backgroundColor: "#FFF4EF",
    paddingTop: 50,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 12,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  image: {
    width: width * 0.72,
    height: width * 0.58,
  },
});