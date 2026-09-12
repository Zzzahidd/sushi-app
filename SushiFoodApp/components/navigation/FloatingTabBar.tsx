import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const TAB_BAR_HORIZONTAL_MARGIN = 16;
const TAB_BAR_WIDTH = Math.min(width - TAB_BAR_HORIZONTAL_MARGIN * 2, 420);

interface TabConfig {
  name: string;
  label: string;
  iconName: string;
  iconType: "feather" | "ionicons" | "material";
  badge?: string | number;
}

const TAB_CONFIGS: TabConfig[] = [
  {
    name: "home",
    label: "Home",
    iconName: "home",
    iconType: "feather",
  },
  {
    name: "menu",
    label: "Menu",
    iconName: "restaurant-outline",
    iconType: "ionicons",
  },
  {
    name: "orders",
    label: "Orders",
    iconName: "receipt-outline",
    iconType: "ionicons",
    badge: "1", // 1 Active order live indicator
  },
  {
    name: "cart",
    label: "Cart",
    iconName: "bag-handle-outline",
    iconType: "ionicons",
    badge: 2, // 2 items in cart
  },
  {
    name: "profile",
    label: "Profile",
    iconName: "user",
    iconType: "feather",
  },
];

export default function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const currentRouteName = state.routes[state.index]?.name || "home";

  // Filter visible tabs (excluding hidden screens like search & favorites)
  const visibleTabs = TAB_CONFIGS;
  const totalTabs = visibleTabs.length;
  const tabWidth = (TAB_BAR_WIDTH - 12) / totalTabs; // 6px padding on left/right

  // Find active tab index (default to 0 if not found in main tabs)
  const activeIndex = Math.max(
    0,
    visibleTabs.findIndex((t) => t.name === currentRouteName)
  );

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(activeIndex * tabWidth + 6, {
      damping: 16,
      stiffness: 180,
      mass: 0.6,
    });
  }, [activeIndex, tabWidth]);

  const activePillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: tabWidth,
  }));

  const bottomMargin = Math.max(insets.bottom + 8, Platform.OS === "ios" ? 28 : 16);

  return (
    <View
      style={[styles.container, { bottom: bottomMargin }]}
      pointerEvents="box-none"
    >
      <View
        style={styles.tabBar}
        accessible={true}
        accessibilityRole="tablist"
      >
        {/* Animated Sliding Active Pill Background */}
        <Animated.View style={[styles.activePillContainer, activePillStyle]}>
          <View style={styles.activePill} />
        </Animated.View>

        {/* Tab Buttons */}
        {visibleTabs.map((tab, index) => {
          const isFocused = currentRouteName === tab.name;

          const onPress = () => {
            try {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            } catch (_) {}

            const targetRoute = state.routes.find((r) => r.name === tab.name);
            if (targetRoute) {
              const event = navigation.emit({
                type: "tabPress",
                target: targetRoute.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(tab.name);
              }
            } else {
              navigation.navigate(tab.name);
            }
          };

          return (
            <TabItem
              key={tab.name}
              tab={tab}
              isFocused={isFocused}
              tabWidth={tabWidth}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

interface TabItemProps {
  tab: TabConfig;
  isFocused: boolean;
  tabWidth: number;
  onPress: () => void;
}

function TabItem({ tab, isFocused, tabWidth, onPress }: TabItemProps) {
  const iconScale = useSharedValue(1);
  const btnScale = useSharedValue(1);

  useEffect(() => {
    if (isFocused) {
      iconScale.value = withSequence(
        withSpring(1.22, { damping: 8, stiffness: 240 }),
        withSpring(1.0, { damping: 14, stiffness: 180 })
      );
    } else {
      iconScale.value = withTiming(1.0, { duration: 150 });
    }
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const animatedBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const handlePressIn = () => {
    btnScale.value = withSpring(0.92, { damping: 12, stiffness: 220 });
  };

  const handlePressOut = () => {
    btnScale.value = withSpring(1.0, { damping: 14, stiffness: 180 });
  };

  const renderIcon = () => {
    const iconColor = isFocused ? "#FF6B4A" : "#8E8E93";
    const iconSize = isFocused ? 23 : 21;

    if (tab.iconType === "ionicons") {
      return (
        <Ionicons
          name={tab.iconName as any}
          size={iconSize}
          color={iconColor}
        />
      );
    }
    if (tab.iconType === "material") {
      return (
        <MaterialCommunityIcons
          name={tab.iconName as any}
          size={iconSize}
          color={iconColor}
        />
      );
    }
    return (
      <Feather
        name={tab.iconName as any}
        size={iconSize}
        color={iconColor}
      />
    );
  };

  return (
    <Animated.View style={[{ width: tabWidth }, animatedBtnStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.tabButton}
        accessible={true}
        accessibilityRole="tab"
        accessibilityLabel={`${tab.label} tab, ${isFocused ? "selected" : "not selected"}`}
        accessibilityState={{ selected: isFocused }}
        accessibilityHint={`Navigates to ${tab.label} screen`}
      >
        <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
          {renderIcon()}

          {/* Badge indicator */}
          {tab.badge !== undefined && (
            <View
              style={[
                styles.badge,
                tab.name === "orders" && styles.orderActiveBadge,
              ]}
            >
              <Text style={styles.badgeText}>{tab.badge}</Text>
            </View>
          )}
        </Animated.View>

        <Text
          numberOfLines={1}
          style={[
            styles.tabLabel,
            isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}
        >
          {tab.label}
        </Text>

        {/* Active Underline Dot */}
        {isFocused && <View style={styles.activeDot} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: TAB_BAR_WIDTH,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  activePillContainer: {
    position: "absolute",
    height: "82%",
    justifyContent: "center",
    alignItems: "center",
  },
  activePill: {
    width: "88%",
    height: "100%",
    backgroundColor: "#FFF2EE",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 107, 74, 0.15)",
  },
  tabButton: {
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    minHeight: 48,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    letterSpacing: -0.2,
  },
  tabLabelActive: {
    color: "#FF6B4A",
    fontWeight: "800",
  },
  tabLabelInactive: {
    color: "#8E8E93",
    fontWeight: "500",
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF6B4A",
    marginTop: 2,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#FF6B4A",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  orderActiveBadge: {
    backgroundColor: "#10B981", // Green pulse badge for active orders
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
});
