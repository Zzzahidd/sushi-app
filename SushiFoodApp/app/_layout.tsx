import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
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
