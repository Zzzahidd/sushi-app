import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LocationHeader() {
  const router = useRouter();

  const handleLocationPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.push("/delivery-address" as any);
  };

  const handleNotificationPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    router.push("/notifications" as any);
  };

  return (
    <View style={styles.container}>
      {/* Left: Location Dropdown */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleLocationPress}
        style={styles.locationWrapper}
      >
        <View style={styles.locationIconCircle}>
          <Feather name="map-pin" size={16} color="#FF6B4A" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.deliveryLabel}>Deliver now</Text>
          <View style={styles.addressRow}>
            <Text numberOfLines={1} style={styles.addressText}>
              123 Tokyo Lane, Shibuya
            </Text>
            <Feather name="chevron-down" size={15} color="#1C1C1E" style={styles.chevron} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Right: Notifications & Quick Actions */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleNotificationPress}
        style={styles.notifButton}
      >
        <Ionicons name="notifications-outline" size={22} color="#1C1C1E" />
        <View style={styles.unreadBadge} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  locationIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF2EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textColumn: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  addressText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1C1E",
    maxWidth: 200,
  },
  chevron: {
    marginLeft: 4,
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  unreadBadge: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});
