import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    Alert.alert(
      "Password Reset",
      "If an account exists with this email, you will receive password reset instructions.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="#111" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email address to receive password reset instructions.
      </Text>

      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backToLogin} onPress={() => router.back()}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
    marginBottom: 35,
    lineHeight: 22,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  backToLogin: {
    marginTop: 25,
    alignItems: "center",
  },
  backToLoginText: {
    color: "#FF6B4A",
    fontWeight: "700",
    fontSize: 16,
  },
});
