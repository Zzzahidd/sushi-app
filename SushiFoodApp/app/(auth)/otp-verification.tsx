import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../services/api";

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "user@example.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<Array<TextInput | null>>([]);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleanText.slice(-1);
    setOtp(newOtp);

    if (cleanText && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const triggerShake = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch {}
    shakeX.value = withSequence(
      withTiming(-12, { duration: 60 }),
      withTiming(12, { duration: 60 }),
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withSpring(0)
    );
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      triggerShake();
      Alert.alert("Incomplete Code", "Please enter all 6 digits of your OTP.");
      return;
    }

    setLoading(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          await AsyncStorage.setItem("userToken", data.token);
        }
        if (data.user) {
          await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert("🎉 Success!", "Your account has been verified successfully.", [
          { text: "Continue", onPress: () => router.replace("/(tabs)/home" as any) },
        ]);
      } else {
        triggerShake();
        Alert.alert("Verification Failed", data.message || "Invalid OTP code. Please check and try again.");
      }
    } catch (err: any) {
      triggerShake();
      Alert.alert("Error", err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
        Alert.alert("OTP Sent", "A fresh verification code has been dispatched to your email.");
      } else {
        Alert.alert("Failed", data.message || "Could not resend OTP. Please try again later.");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to resend OTP.");
    }
  };

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#111" />
        </TouchableOpacity>

        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <View style={styles.iconCircle}>
            <Feather name="mail" size={32} color="#FF6B4A" />
          </View>
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.subtitle}>
            We&apos;ve sent a 6-digit verification code to{"\n"}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
        </Animated.View>

        {/* 6-Digit OTP Input Box Group */}
        <Animated.View style={[styles.otpRow, animatedShakeStyle]}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : null,
                index === otp.findIndex((d) => !d) ? styles.otpBoxActive : null,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              selectTextOnFocus
            />
          ))}
        </Animated.View>

        {/* Resend Timer */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.resendContainer}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend} style={styles.resendBtn}>
              <Feather name="refresh-cw" size={16} color="#FF6B4A" />
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerCount}>{timer}s</Text>
            </Text>
          )}
        </Animated.View>

        {/* Verify Button */}
        <TouchableOpacity
          activeOpacity={0.88}
          style={[styles.verifyButton, loading ? styles.verifyButtonDisabled : null]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF2EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#7A7A7A",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  emailHighlight: {
    color: "#111111",
    fontWeight: "700",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 6,
  },
  otpBox: {
    width: 48,
    height: 60,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
  },
  otpBoxFilled: {
    borderColor: "#FF6B4A",
    backgroundColor: "#FFF9F7",
  },
  otpBoxActive: {
    borderColor: "#FF6B4A",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  timerText: {
    fontSize: 14,
    color: "#888888",
  },
  timerCount: {
    color: "#FF6B4A",
    fontWeight: "700",
  },
  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resendText: {
    fontSize: 15,
    color: "#FF6B4A",
    fontWeight: "700",
  },
  verifyButton: {
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
