import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  return (
    <>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
          <TouchableOpacity
            style={styles.helpBtn}
            onPress={() => {
              triggerHaptic();
              router.push("/chat" as any);
            }}
          >
            <Feather name="help-circle" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Tab Switcher: Active / Past */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic();
              setActiveTab("active");
            }}
            style={[styles.tabItem, activeTab === "active" && styles.tabItemActive]}
          >
            <Text style={[styles.tabText, activeTab === "active" && styles.tabTextActive]}>
              Active Order (1)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic();
              setActiveTab("past");
            }}
            style={[styles.tabItem, activeTab === "past" && styles.tabItemActive]}
          >
            <Text style={[styles.tabText, activeTab === "past" && styles.tabTextActive]}>
              Order History (4)
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === "active" ? (
            <Animated.View entering={FadeInDown.duration(400)}>
              {/* Live Active Order Card */}
              <View style={styles.activeOrderCard}>
                {/* Status Header */}
                <View style={styles.orderCardHeader}>
                  <View>
                    <Text style={styles.orderNumber}>Order #SB-8924</Text>
                    <Text style={styles.orderTime}>Today at 1:24 PM • Sushir Bhai Express</Text>
                  </View>
                  <View style={styles.statusPill}>
                    <View style={styles.statusPulse} />
                    <Text style={styles.statusPillText}>On The Way</Text>
                  </View>
                </View>

                {/* Progress Stepper Mini */}
                <View style={styles.stepperContainer}>
                  <View style={styles.stepCircleActive}>
                    <Feather name="check" size={12} color="#FFF" />
                  </View>
                  <View style={styles.stepLineActive} />
                  <View style={styles.stepCircleActive}>
                    <Feather name="check" size={12} color="#FFF" />
                  </View>
                  <View style={styles.stepLineActive} />
                  <View style={[styles.stepCircleActive, { backgroundColor: "#FF6B4A" }]}>
                    <MaterialCommunityIcons name="moped" size={14} color="#FFF" />
                  </View>
                  <View style={styles.stepLineInactive} />
                  <View style={styles.stepCircleInactive}>
                    <Feather name="home" size={12} color="#A1A1AA" />
                  </View>
                </View>

                <View style={styles.etaBox}>
                  <View style={styles.etaLeft}>
                    <Text style={styles.etaLabel}>Estimated Arrival</Text>
                    <Text style={styles.etaValue}>1:42 PM (In 18 mins)</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.trackButton}
                    onPress={() => {
                      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
                      router.push("/live-tracking" as any);
                    }}
                  >
                    <Text style={styles.trackButtonText}>Live Map</Text>
                    <Feather name="arrow-right" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>

                {/* Items in active order */}
                <View style={styles.divider} />
                <View style={styles.activeItemsRow}>
                  <Image
                    source={require("../../assets/images/orders/salmon-nigiri.png")}
                    style={styles.activeItemImg}
                    resizeMode="contain"
                  />
                  <View style={styles.activeItemDetails}>
                    <Text style={styles.activeItemName}>Salmon Nigiri Set + Dragon Roll</Text>
                    <Text style={styles.activeItemMeta}>2 items • $34.50 (Paid with Apple Pay)</Text>
                  </View>
                </View>
              </View>

              {/* Delivery Driver Info Card */}
              <View style={styles.driverCard}>
                <Image
                  source={require("../../assets/images/tracking/driver.png")}
                  style={styles.driverAvatar}
                />
                <View style={styles.driverInfo}>
                  <Text style={styles.driverRole}>Assigned Courier</Text>
                  <Text style={styles.driverName}>Alexei Volkov</Text>
                  <Text style={styles.driverRating}>⭐ 4.9 (1.8k deliveries)</Text>
                </View>
                <TouchableOpacity
                  style={styles.driverActionBtn}
                  onPress={() => {
                    triggerHaptic();
                    router.push("/chat" as any);
                  }}
                >
                  <Feather name="message-circle" size={18} color="#FF6B4A" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.duration(400)}>
              {/* Past Order 1 */}
              <View style={styles.pastOrderCard}>
                <View style={styles.pastHeader}>
                  <View>
                    <Text style={styles.pastOrderNumber}>Order #SB-8741</Text>
                    <Text style={styles.pastDate}>Sep 07, 2026 • 7:15 PM</Text>
                  </View>
                  <View style={styles.deliveredPill}>
                    <Feather name="check-circle" size={13} color="#10B981" />
                    <Text style={styles.deliveredText}>Delivered</Text>
                  </View>
                </View>

                <View style={styles.pastItems}>
                  <Text style={styles.pastItemNames}>2x Spicy Tuna Crunch, 1x Miso Soup</Text>
                  <Text style={styles.pastPrice}>$28.50</Text>
                </View>

                <View style={styles.pastActions}>
                  <TouchableOpacity
                    style={styles.reorderBtn}
                    onPress={() => {
                      triggerHaptic();
                      router.push("/(tabs)/cart" as any);
                    }}
                  >
                    <Feather name="repeat" size={14} color="#FF6B4A" />
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reviewBtn}
                    onPress={() => {
                      triggerHaptic();
                      router.push("/review" as any);
                    }}
                  >
                    <Feather name="star" size={14} color="#71717A" />
                    <Text style={styles.reviewText}>Rate Order</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Past Order 2 */}
              <View style={styles.pastOrderCard}>
                <View style={styles.pastHeader}>
                  <View>
                    <Text style={styles.pastOrderNumber}>Order #SB-8610</Text>
                    <Text style={styles.pastDate}>Aug 29, 2026 • 8:40 PM</Text>
                  </View>
                  <View style={styles.deliveredPill}>
                    <Feather name="check-circle" size={13} color="#10B981" />
                    <Text style={styles.deliveredText}>Delivered</Text>
                  </View>
                </View>

                <View style={styles.pastItems}>
                  <Text style={styles.pastItemNames}>1x Chef&apos;s Omakase Supreme Platter</Text>
                  <Text style={styles.pastPrice}>$45.00</Text>
                </View>

                <View style={styles.pastActions}>
                  <TouchableOpacity
                    style={styles.reorderBtn}
                    onPress={() => {
                      triggerHaptic();
                      router.push("/(tabs)/cart" as any);
                    }}
                  >
                    <Feather name="repeat" size={14} color="#FF6B4A" />
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reviewBtn}
                    onPress={() => {
                      triggerHaptic();
                      router.push("/review" as any);
                    }}
                  >
                    <Feather name="star" size={14} color="#71717A" />
                    <Text style={styles.reviewText}>Rated 5.0 ⭐</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  helpBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 4,
    marginTop: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 14,
  },
  tabItemActive: {
    backgroundColor: "#FF6B4A",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  activeOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 14,
  },
  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  orderTime: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLineActive: {
    flex: 1,
    height: 3,
    backgroundColor: "#10B981",
  },
  stepLineInactive: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E7EB",
  },
  stepCircleInactive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  etaBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 14,
  },
  etaLeft: {},
  etaLabel: {
    fontSize: 12,
    color: "#71717A",
    fontWeight: "500",
  },
  etaValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 2,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 6,
  },
  trackButtonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#F4F4F5",
    marginVertical: 14,
  },
  activeItemsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeItemImg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  activeItemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  activeItemName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  activeItemMeta: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF2EE",
  },
  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },
  driverRole: {
    fontSize: 11,
    color: "#71717A",
    fontWeight: "600",
  },
  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 1,
  },
  driverRating: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 2,
  },
  driverActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
  },
  pastOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  pastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pastOrderNumber: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  pastDate: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 1,
  },
  deliveredPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  deliveredText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#10B981",
  },
  pastItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  pastItemNames: {
    fontSize: 13,
    color: "#4B5563",
    flex: 1,
  },
  pastPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A1A1A",
    marginLeft: 8,
  },
  pastActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F4F4F5",
  },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  reorderText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  reviewBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  reviewText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },
});