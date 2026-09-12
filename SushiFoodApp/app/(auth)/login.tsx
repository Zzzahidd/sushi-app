import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { authApi } from "../../services/api";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing Details", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const data = await authApi.login(email.trim(), password);

      if (data.success && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("onboardingCompleted", "true");
        if (data.user) {
          await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace("/(tabs)/home" as any);
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials.");
      }
    } catch {
      // Fallback for offline/demo: allow login
      await AsyncStorage.setItem("userToken", "demo_auth_token_sb");
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("onboardingCompleted", "true");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      router.replace("/(tabs)/home" as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
            <View style={styles.brandIconWrapper}>
              <Text style={styles.brandEmoji}>🍣</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to order your favorite fresh sushi rolls.
            </Text>
          </Animated.View>

          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#8E8E93" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#8E8E93"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              style={styles.forgotBtn}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              style={[styles.button, loading ? styles.buttonDisabled : null]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Quick Demo Bypass */}
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/home" as any)}
              style={styles.guestBtn}
            >
              <Text style={styles.guestText}>Continue as Guest ➔</Text>
            </TouchableOpacity>

            <View style={styles.bottom}>
              <Text style={styles.bottomText}>Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  brandIconWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFF2EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  brandEmoji: {
    fontSize: 34,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  eyeBtn: {
    padding: 6,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    color: "#FF6B4A",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  guestBtn: {
    marginTop: 18,
    alignItems: "center",
    paddingVertical: 8,
  },
  guestText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "600",
  },
  bottom: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 15,
    color: "#777",
  },
  signup: {
    marginLeft: 6,
    color: "#FF6B4A",
    fontWeight: "700",
    fontSize: 15,
  },
});