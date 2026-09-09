import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B4A" />
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.title}>Welcome to{"\n"}Sushir Bhai</Text>
          <Text style={styles.subtitle}>
            Order fresh, delicious Japanese sushi and rolls delivered straight to your door.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  bottomCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#777",
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B4A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
