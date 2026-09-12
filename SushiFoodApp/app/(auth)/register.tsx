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
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PrimaryButton from "../../components/auth/PrimaryButton";
import { authApi } from "../../services/api";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing Fields", "Please enter your name, email, and password.");
      return;
    }

    setLoading(true);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const data = await authApi.register(name.trim(), email.trim(), password, phone.trim());

      if (data.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({
          pathname: "/(auth)/otp-verification" as any,
          params: { email: email.trim(), name: name.trim() },
        });
      } else {
        Alert.alert("Registration Failed", data.message || "Could not register account.");
      }
    } catch (err: any) {
      Alert.alert("Registration Error", err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <Animated.View entering={FadeInDown.duration(400)}>
            <AuthHeader
              title="Create Account"
              subtitle="Join Sushir Bhai to order delicious Japanese sushi."
            />
          </Animated.View>

          <View style={styles.form}>
            <AuthInput
              label="Full Name"
              placeholder="e.g. Abdullah Mamun"
              value={name}
              onChangeText={setName}
            />

            <AuthInput
              label="Email Address"
              placeholder="name@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <AuthInput
              label="Phone Number"
              placeholder="+1 234 567 890"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
            />

            {loading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#FF6B4A" />
              </View>
            ) : (
              <PrimaryButton
                title="Create Account"
                onPress={handleRegister}
              />
            )}

            <View style={styles.bottom}>
              <Text style={styles.text}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.back()}
              >
                <Text style={styles.login}>
                  Sign In
                </Text>
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
    backgroundColor: "#fff",
  },
  scroll: {
    paddingBottom: 40,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 25,
  },
  loadingBox: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  text: {
    fontSize: 15,
    color: "#777",
  },
  login: {
    marginLeft: 5,
    color: "#FF6B4A",
    fontWeight: "700",
    fontSize: 15,
  },
});