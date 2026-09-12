import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const triggerHaptic = () => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (_) {}
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of Sushir Bhai?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          triggerHaptic();
          try {
            await AsyncStorage.multiRemove(["isLoggedIn", "userToken", "userData"]);
          } catch (_) {}
          router.replace("/(auth)/login" as any);
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => {
                triggerHaptic();
                Alert.alert("Settings", "App version 2.1.0 (Latest)");
              }}
            >
              <Feather name="settings" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </Animated.View>

          {/* User Profile Card */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require("../../assets/images/tracking/driver.png")}
                style={styles.avatar}
              />
              <View style={styles.badgeVerified}>
                <Feather name="check" size={12} color="#FFF" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Zahid Hasan</Text>
              <Text style={styles.userEmail}>zahid@sushirbhai.com</Text>
              <View style={styles.memberTag}>
                <MaterialCommunityIcons name="crown" size={14} color="#FFB800" />
                <Text style={styles.memberTagText}>Gold Foodie Member</Text>
              </View>
            </View>
          </Animated.View>

          {/* User Quick Stats */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>340</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$24</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </Animated.View>

          {/* Account Section */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
            <Text style={styles.sectionHeading}>Account Settings</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => {
                  triggerHaptic();
                  router.push("/(tabs)/orders" as any);
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#FFF2EE" }]}>
                  <Feather name="shopping-bag" size={18} color="#FF6B4A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Order History</Text>
                  <Text style={styles.menuSubtitle}>View past receipts and reorder</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BBB" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => {
                  triggerHaptic();
                  router.push("/delivery-address" as any);
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#EEF4FF" }]}>
                  <Feather name="map-pin" size={18} color="#3B82F6" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Saved Addresses</Text>
                  <Text style={styles.menuSubtitle}>Home, Office, Apartment</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BBB" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => {
                  triggerHaptic();
                  router.push("/payment" as any);
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#ECFDF5" }]}>
                  <Feather name="credit-card" size={18} color="#10B981" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Payment Methods</Text>
                  <Text style={styles.menuSubtitle}>Mastercard ending in 4242</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BBB" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Preferences Section */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
            <Text style={styles.sectionHeading}>Preferences</Text>
            <View style={styles.menuContainer}>
              <View style={styles.menuRow}>
                <View style={[styles.iconCircle, { backgroundColor: "#FFF7ED" }]}>
                  <Feather name="bell" size={18} color="#F97316" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Order Notifications</Text>
                  <Text style={styles.menuSubtitle}>Live delivery status updates</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={(val) => {
                    triggerHaptic();
                    setNotificationsEnabled(val);
                  }}
                  trackColor={{ false: "#E2E8F0", true: "#FF6B4A" }}
                  thumbColor="#FFF"
                />
              </View>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => {
                  triggerHaptic();
                  router.push("/chat" as any);
                }}
              >
                <View style={[styles.iconCircle, { backgroundColor: "#F5F3FF" }]}>
                  <Feather name="help-circle" size={18} color="#8B5CF6" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Support & Live Chat</Text>
                  <Text style={styles.menuSubtitle}>24/7 Sushir Bhai Help Desk</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BBB" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Logout Button */}
          <Animated.View entering={FadeInDown.delay(500).duration(400)}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.appVersion}>Sushir Bhai v2.1.0 • Crafted for Sushi Lovers</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 130,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFEBE5",
  },
  badgeVerified: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  userEmail: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
  },
  memberTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: "#FEF3C7",
  },
  memberTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#B45309",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 12,
    color: "#71717A",
    fontWeight: "600",
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#71717A",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F4F4F5",
    marginLeft: 54,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
  },
  appVersion: {
    textAlign: "center",
    fontSize: 12,
    color: "#A1A1AA",
    marginTop: 20,
  },
});