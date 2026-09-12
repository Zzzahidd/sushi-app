import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "./api";

// Initialize notification handler safely
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowList: true,
      shouldShowBanner: true,
    } as any),
  });
} catch (e) {
  console.warn("⚠️ Notification handler registration skipped:", e);
}

const PUSH_TOKEN_KEY = "@sushir_bhai_push_token";

/**
 * Register device for Expo Push Notifications
 * Obtains token and syncs with Sushir Bhai backend API safely
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (Platform.OS === "web") {
    return null;
  }

  try {
    // 1. Android Notification Channel configuration
    if (Platform.OS === "android") {
      try {
        await Notifications.setNotificationChannelAsync("sushi-orders", {
          name: "Sushi Orders & Tracking",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF6B4A",
          sound: "default",
          enableLights: true,
          enableVibrate: true,
        });

        await Notifications.setNotificationChannelAsync("sushi-promos", {
          name: "Exclusive Sushi Deals & Offers",
          importance: Notifications.AndroidImportance.DEFAULT,
          lightColor: "#FFB800",
        });
      } catch (channelErr) {
        console.warn("⚠️ Notification channel creation skipped:", channelErr);
      }
    }

    // 2. Check existing permissions
    const existing: any = await Notifications.getPermissionsAsync().catch(() => null);
    let isGranted = existing?.status === "granted" || existing?.granted;

    // 3. Request permissions if not granted
    if (!isGranted) {
      const requested: any = await Notifications.requestPermissionsAsync().catch(() => null);
      isGranted = requested?.status === "granted" || requested?.granted;
    }

    if (!isGranted) {
      console.log("ℹ️ Push notification permission not granted.");
      return null;
    }

    // 4. Retrieve Expo push token with projectId fallback
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "c1d371dd-25b0-4bc4-9028-2199a7673b96",
    }).catch(() => null);

    const token = tokenData?.data || null;

    if (token) {
      console.log("📱 [Expo Push Token]:", token);
      await AsyncStorage.setItem(PUSH_TOKEN_KEY, token).catch(() => {});
      await syncTokenWithBackend(token);
    }

    return token;
  } catch (error: any) {
    console.warn("⚠️ Push notification registration skipped gracefully:", error?.message || error);
    return null;
  }
}

/**
 * Register push token with backend /api/push/register-token
 */
export async function syncTokenWithBackend(token: string) {
  try {
    const userId = await AsyncStorage.getItem("userId").catch(() => null);
    await apiRequest("/push/register-token", {
      method: "POST",
      body: JSON.stringify({
        token,
        userId: userId || undefined,
      }),
    });
    console.log("✅ [Push Service] Token synced with backend API");
  } catch (err: any) {
    console.warn("⚠️ Failed to sync push token with backend (offline/cached):", err?.message);
  }
}

/**
 * Schedule or immediately trigger a local notification for instant user feedback
 */
export async function displayLocalNotification(
  title: string,
  body: string,
  data: Record<string, any> = {}
) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: "default",
        badge: 1,
      },
      trigger: null, // immediate trigger
    });
  } catch (error) {
    console.warn("Local notification display error:", error);
  }
}

/**
 * Add listeners for received notifications and user interactions
 */
export function addNotificationListeners(
  onNotificationReceived?: (notification: Notifications.Notification) => void,
  onNotificationResponse?: (response: Notifications.NotificationResponse) => void
) {
  let receivedSubscription: any = null;
  let responseSubscription: any = null;

  try {
    receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      onNotificationReceived?.(notification);
    });

    responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      onNotificationResponse?.(response);
    });
  } catch (err) {
    console.warn("⚠️ Notification listener setup skipped:", err);
  }

  return () => {
    try {
      receivedSubscription?.remove();
      responseSubscription?.remove();
    } catch (_) {}
  };
}
