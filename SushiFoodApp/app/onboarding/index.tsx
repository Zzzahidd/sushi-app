import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Artisan Japanese\nSushi Made Fresh",
    subtitle: "Prepared daily by master chefs with premium Atlantic salmon and authentic Japanese seasonings.",
    image: require("../../assets/images/icon.png"),
    badge: "🍣 Master Crafted",
  },
  {
    id: "2",
    title: "Ultra Fast\n30-Min Delivery",
    subtitle: "Straight from our kitchen to your doorstep in insulated temperature-controlled carriers.",
    image: require("../../assets/images/splash/sushi.png"),
    badge: "⚡ Express Courier",
  },
  {
    id: "3",
    title: "Live GPS\nOrder Tracking",
    subtitle: "Watch your courier in real-time on our live map from sushi preparation to arrival.",
    image: require("../../assets/images/delivery/map.png"),
    badge: "📍 Live Map",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const btnScale = useSharedValue(1);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const handleNext = async () => {
    triggerHaptic();
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
      try {
        await AsyncStorage.setItem("onboardingCompleted", "true");
      } catch (_) {}
      router.replace("/(auth)/login" as any);
    }
  };

  const handleSkip = async () => {
    triggerHaptic();
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
    } catch (_) {}
    router.replace("/(auth)/login" as any);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B4A" />
      <SafeAreaView style={styles.container}>
        {/* Top Header with Skip */}
        <View style={styles.header}>
          <View style={styles.brandPill}>
            <Text style={styles.brandPillText}>SUSHIR BHAI</Text>
          </View>
          {currentIndex < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Carousel Content */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(idx);
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.imageCard}>
                <View style={styles.badgeWrapper}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
                <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
              </View>
            </View>
          )}
        />

        {/* Bottom Card */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.bottomCard}>
          {/* Progress Indicators */}
          <View style={styles.dotsRow}>
            {SLIDES.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  currentIndex === idx && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Dynamic Content */}
          <Text style={styles.title}>{SLIDES[currentIndex].title}</Text>
          <Text style={styles.subtitle}>{SLIDES[currentIndex].subtitle}</Text>

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {currentIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
            </Text>
            <Feather name="arrow-right" size={20} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B4A",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 20 : 10,
    zIndex: 10,
  },
  brandPill: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  brandPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  slide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imageCard: {
    width: width * 0.85,
    height: width * 0.75,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    position: "relative",
  },
  badgeWrapper: {
    position: "absolute",
    top: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  slideImage: {
    width: width * 0.55,
    height: width * 0.55,
  },
  bottomCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: Platform.OS === "ios" ? 40 : 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    width: 24,
    backgroundColor: "#FF6B4A",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#71717A",
    lineHeight: 22,
    marginBottom: 28,
  },
  button: {
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});
