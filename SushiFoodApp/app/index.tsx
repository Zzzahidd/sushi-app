import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const logoScale = useSharedValue(0.9);
  const pulseOpacity = useSharedValue(0.6);

  useEffect(() => {
    let isMounted = true;

    // Breathing pulse animation
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 900 }),
        withTiming(0.95, { duration: 900 })
      ),
      -1,
      true
    );

    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0.5, { duration: 900 })
      ),
      -1,
      true
    );

    const checkNavigation = async () => {
      try {
        const [isLoggedIn, userToken, onboardingCompleted] = await Promise.all([
          AsyncStorage.getItem("isLoggedIn"),
          AsyncStorage.getItem("userToken"),
          AsyncStorage.getItem("onboardingCompleted"),
        ]);

        if (!isMounted) return;

        // If already logged in -> go straight to Home (no splash delay)
        if (isLoggedIn === "true" && userToken) {
          router.replace("/(tabs)/home" as any);
          return;
        }

        // If user logged out -> go straight to Login screen (never stay logged in)
        if (onboardingCompleted === "true" && isLoggedIn !== "true") {
          router.replace("/(auth)/login" as any);
          return;
        }

        // New user: show splash screen animation for 1.6s then go to onboarding
        await new Promise((resolve) => setTimeout(resolve, 1600));
        if (isMounted) {
          router.replace("/onboarding" as any);
        }
      } catch (e) {
        if (isMounted) {
          router.replace("/(auth)/login" as any);
        }
      }
    };

    checkNavigation();

    return () => {
      isMounted = false;
    };
  }, [router, logoScale, pulseOpacity]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B4A" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Glowing Background Ring */}
          <Animated.View style={[styles.glowRing, animatedPulseStyle]} />

          {/* Animated App Icon */}
          <Animated.View style={[styles.iconWrapper, animatedLogoStyle]}>
            <Image
              source={require("../assets/images/splash/sushi.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Japanese Kanji Tag */}
          <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.tagBadge}>
            <Text style={styles.tagText}>伝統の味 • AUTHENTIC JAPANESE</Text>
          </Animated.View>

          {/* Brand Name */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.textContainer}>
            <Text style={styles.brandTitle}>SUSHIR BHAI</Text>
            <Text style={styles.brandSubtitle}>Master Crafted Sushi & Express Delivery</Text>
          </Animated.View>

          {/* Bottom Loading Indicator */}
          <Animated.View entering={FadeIn.delay(600).duration(500)} style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={styles.loadingText}>Preparing your experience...</Text>
          </Animated.View>
        </View>

        {/* Footer Version */}
        <Text style={styles.versionText}>v2.1.0 • Sushir Bhai</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B4A",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  glowRing: {
    position: "absolute",
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  iconWrapper: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  logoImage: {
    width: 130,
    height: 130,
  },
  tagBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  tagText: {
    color: "#FFE8E0",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  textContainer: {
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 3,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.88)",
    fontWeight: "500",
    textAlign: "center",
    maxWidth: 260,
  },
  loadingContainer: {
    marginTop: 48,
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 12,
    fontWeight: "600",
  },
  versionText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 11,
    marginBottom: 20,
    fontWeight: "500",
  },
});