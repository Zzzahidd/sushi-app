import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const handleResetPassword = () => {
    if (!email) {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Password Reset",
        "If an account exists with this email, you will receive password reset instructions.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }, 600);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(400)} style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              triggerHaptic();
              router.back();
            }}
          >
            <Feather name="arrow-left" size={20} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={styles.iconCircle}>
            <Feather name="lock" size={32} color="#FF6B4A" />
          </View>

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your registered email address and we&apos;ll send you instructions to reset your password.
          </Text>

          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, isSubmitting && { opacity: 0.7 }]}
            onPress={handleResetPassword}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
            </Text>
            <Feather name="arrow-right" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToLogin}
            onPress={() => {
              triggerHaptic();
              router.back();
            }}
          >
            <Text style={styles.backToLoginText}>Back to Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 20 : 10,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F4F4F5",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#71717A",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1A1A1A",
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
    fontWeight: "800",
    fontSize: 17,
  },
  backToLogin: {
    marginTop: 24,
    alignItems: "center",
  },
  backToLoginText: {
    color: "#FF6B4A",
    fontWeight: "700",
    fontSize: 15,
  },
});
