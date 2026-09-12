import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  registerForPushNotificationsAsync,
  addNotificationListeners,
} from "../services/notifications";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // 1. Initialize Push Token Registration safely in background
    registerForPushNotificationsAsync().catch(() => {});

    // 2. Set up foreground and tap notification listeners safely
    const cleanupListeners = addNotificationListeners(
      (notification) => {
        console.log("📥 Notification in foreground:", notification?.request?.content?.title);
      },
      (response) => {
        try {
          const data = (response?.notification?.request?.content?.data || {}) as Record<string, any>;
          if (data?.screen === "live-tracking") {
            const targetOrderId = typeof data.orderId === "string" ? data.orderId : "SB-8924";
            router.push(`/live-tracking?orderId=${targetOrderId}` as any);
          } else if (data?.screen === "menu") {
            router.push("/(tabs)/menu" as any);
          }
        } catch (_) {}
      }
    );

    return () => {
      cleanupListeners?.();
    };
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details" />
        <Stack.Screen name="details/[id]" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="delivery-address" />
        <Stack.Screen name="tracking" />
        <Stack.Screen name="live-tracking" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="review" />
        <Stack.Screen name="chat" />
      </Stack>
    </>
  );
}
