import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInUp,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Safe Google Maps loader
let MapView: any = null;
let Marker: any = null;
let Polyline: any = null;
let PROVIDER_GOOGLE: any = null;

try {
  if (Platform.OS !== "web") {
    const Maps = require("react-native-maps");
    MapView = Maps.default || Maps.MapView;
    Marker = Maps.Marker;
    Polyline = Maps.Polyline;
    PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  }
} catch (err) {
  console.log("ℹ️ Native map module not loaded, using high-fidelity vector map canvas.");
}

import {
  getSocket,
  joinOrderRoom,
  leaveOrderRoom,
  subscribeToDriverLocation,
  subscribeToOrderStatus,
  triggerGpsSimulation,
  stopGpsSimulation,
  DriverLocationData,
  OrderStatusData,
} from "../services/socket";
import { displayLocalNotification } from "../services/notifications";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Real GPS Route Coordinates (Tokyo / Metropolis Grid)
const RESTAURANT_COORD = { latitude: 35.6880, longitude: 139.6900 };
const DESTINATION_COORD = { latitude: 35.6985, longitude: 139.7032 };

const REAL_GPS_WAYPOINTS = [
  { latitude: 35.6895, longitude: 139.6917, heading: 45, speed: 22, eta: 14, note: "Alexei picked up your order" },
  { latitude: 35.6908, longitude: 139.6934, heading: 55, speed: 26, eta: 12, note: "Approaching Chuo Avenue" },
  { latitude: 35.6924, longitude: 139.6958, heading: 60, speed: 28, eta: 10, note: "Cruising down Sushi Boulevard" },
  { latitude: 35.6942, longitude: 139.6982, heading: 70, speed: 25, eta: 8, note: "Passing Shibuya Crossing" },
  { latitude: 35.6960, longitude: 139.7005, heading: 80, speed: 20, eta: 5, note: "Turning onto your street" },
  { latitude: 35.6975, longitude: 139.7020, heading: 90, speed: 15, eta: 2, note: "Alexei is right outside!" },
  { latitude: 35.6985, longitude: 139.7032, heading: 90, speed: 0, eta: 0, note: "Delivered! Enjoy your meal 🍣" },
];

const VECTOR_WAYPOINTS: { top: `${number}%`; left: `${number}%`; heading: number }[] = [
  { top: "54%", left: "22%", heading: 45 },
  { top: "48%", left: "32%", heading: 55 },
  { top: "43%", left: "44%", heading: 60 },
  { top: "38%", left: "55%", heading: 70 },
  { top: "33%", left: "65%", heading: 80 },
  { top: "28%", left: "74%", heading: 90 },
  { top: "24%", left: "80%", heading: 90 },
];

// Clean Google Maps Minimal Styling
const GOOGLE_MAPS_CUSTOM_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
];

export default function LiveTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = params.orderId || "SB-8924";

  const mapRef = useRef<any>(null);
  const [courierLocation, setCourierLocation] = useState(REAL_GPS_WAYPOINTS[0]);
  const [etaMinutes, setEtaMinutes] = useState(14);
  const [currentStep, setCurrentStep] = useState(3); // 1: Received, 2: Prepared, 3: On Way, 4: Delivered
  const [statusTitle, setStatusTitle] = useState("Heading Your Way");
  const [statusSubtitle, setStatusSubtitle] = useState("Alexei is 3 stops away on his e-scooter");
  const [isSimulating, setIsSimulating] = useState(false);
  const [courierSpeed, setCourierSpeed] = useState(24);
  const [isConnected, setIsConnected] = useState(false);
  const [mapViewMode, setMapViewMode] = useState<"vector" | "native">("vector");

  const scooterPulse = useSharedValue(1);
  const simStepRef = useRef(0);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  useEffect(() => {
    scooterPulse.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 800 }),
        withTiming(1.0, { duration: 800 })
      ),
      -1,
      true
    );

    // Socket.io Real-Time Room Subscription
    joinOrderRoom(orderId);
    const socket = getSocket();
    setIsConnected(socket.connected);

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    // Listen for live driver GPS location updates from Socket.io
    const unsubscribeLocation = subscribeToDriverLocation((data: DriverLocationData) => {
      console.log("📍 [Live Tracking] Live Driver GPS:", data);
      if (data.latitude && data.longitude) {
        const newCoord = {
          latitude: data.latitude,
          longitude: data.longitude,
          heading: data.heading || 0,
          speed: data.speed || 24,
          eta: data.etaMinutes || etaMinutes,
          note: data.note || "Alexei is cruising on route",
        };
        setCourierLocation(newCoord);

        // Smooth camera follow if native map is active
        try {
          if (mapRef.current && Platform.OS !== "web" && mapRef.current.animateCamera) {
            mapRef.current.animateCamera(
              {
                center: { latitude: data.latitude, longitude: data.longitude },
                zoom: 16,
                pitch: 40,
                heading: data.heading || 0,
              },
              { duration: 1000 }
            );
          }
        } catch (_) {}
      }

      if (data.etaMinutes !== undefined) setEtaMinutes(data.etaMinutes);
      if (data.speed !== undefined) setCourierSpeed(data.speed);
      if (data.note) setStatusSubtitle(data.note);
    });

    // Listen for order lifecycle changes
    const unsubscribeStatus = subscribeToOrderStatus((data: OrderStatusData) => {
      if (data.step) setCurrentStep(data.step);
      if (data.status === "delivered") {
        setCurrentStep(4);
        setStatusTitle("Order Delivered! 🎉");
        setStatusSubtitle("Enjoy your fresh sushi meal! Tap below to review.");
        setEtaMinutes(0);
        displayLocalNotification("🍣 Order Delivered!", "Alexei has arrived with your sushi!");
      }
    });

    return () => {
      leaveOrderRoom(orderId);
      unsubscribeLocation();
      unsubscribeStatus();
      stopGpsSimulation(orderId);
    };
  }, [orderId]);

  // Real-time GPS ride simulation loop
  const handleToggleSimulation = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);

    if (isSimulating) {
      setIsSimulating(false);
      stopGpsSimulation(orderId);
      return;
    }

    setIsSimulating(true);
    triggerGpsSimulation(orderId);
    simStepRef.current = 0;

    const interval = setInterval(() => {
      if (simStepRef.current >= REAL_GPS_WAYPOINTS.length) {
        clearInterval(interval);
        setIsSimulating(false);
        return;
      }

      const point = REAL_GPS_WAYPOINTS[simStepRef.current];
      setCourierLocation(point);
      setEtaMinutes(point.eta);
      setCourierSpeed(point.speed);
      setStatusSubtitle(point.note);

      try {
        if (mapRef.current && Platform.OS !== "web" && mapRef.current.animateCamera) {
          mapRef.current.animateCamera(
            {
              center: { latitude: point.latitude, longitude: point.longitude },
              zoom: 16,
              pitch: 35,
              heading: point.heading,
            },
            { duration: 1200 }
          );
        }
      } catch (_) {}

      if (point.eta === 0) {
        setCurrentStep(4);
        setStatusTitle("Order Delivered! 🎉");
        displayLocalNotification("🍣 Order Delivered!", "Alexei has arrived with your order.");
      } else {
        setCurrentStep(3);
        setStatusTitle("Heading Your Way");
      }

      simStepRef.current++;
    }, 2800);
  };

  const handleCall = () => {
    triggerHaptic();
    Alert.alert("Call Alexei", "Call courier at +1 (555) 349-2810?", [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL("tel:+15553492810") },
    ]);
  };

  const hasNativeMap = Platform.OS !== "web" && MapView != null;

  const currentIdx = Math.max(
    0,
    REAL_GPS_WAYPOINTS.findIndex(
      (w) => w.latitude === courierLocation.latitude && w.longitude === courierLocation.longitude
    )
  );
  const vectorCoord = VECTOR_WAYPOINTS[currentIdx >= 0 && currentIdx < VECTOR_WAYPOINTS.length ? currentIdx : 0];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        {/* Real Google Maps or High-Fidelity Vector Canvas */}
        {mapViewMode === "native" && hasNativeMap ? (
          <MapView
            ref={mapRef}
            provider={Platform.OS === "android" ? undefined : PROVIDER_GOOGLE}
            style={styles.mapArea}
            initialRegion={{
              latitude: 35.6935,
              longitude: 139.6970,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={false}
            showsCompass={false}
            showsTraffic={false}
          >
            {/* Real-time driving polyline route */}
            <Polyline
              coordinates={[
                RESTAURANT_COORD,
                ...REAL_GPS_WAYPOINTS.map((w) => ({ latitude: w.latitude, longitude: w.longitude })),
                DESTINATION_COORD,
              ]}
              strokeColor="#FF6B4A"
              strokeWidth={4}
            />

            {/* Restaurant Marker */}
            <Marker coordinate={RESTAURANT_COORD} title="Sushir Bhai Kitchen">
              <View style={styles.restaurantMarker}>
                <Text style={{ fontSize: 16 }}>🍣</Text>
              </View>
            </Marker>

            {/* Home Destination Marker */}
            <Marker coordinate={DESTINATION_COORD} title="Home Delivery Dropoff">
              <View style={styles.destinationPinWrapper}>
                <View style={styles.destinationPinBubble}>
                  <Text style={styles.destinationPinText}>Home 🏠</Text>
                </View>
                <Image
                  source={require("../assets/images/tracking/pin.png")}
                  style={styles.pinImage}
                />
              </View>
            </Marker>

            {/* Dynamic Real-Time Courier Marker */}
            <Marker
              coordinate={{
                latitude: courierLocation.latitude,
                longitude: courierLocation.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
              title="Alexei (Courier)"
            >
              <View style={styles.scooterMarkerWrapper}>
                <View style={styles.scooterHalo} />
                <Image
                  source={require("../assets/images/tracking/scooter.png")}
                  style={[
                    styles.scooterImage,
                    { transform: [{ rotate: `${courierLocation.heading}deg` }] },
                  ]}
                />
                <View style={styles.scooterBadge}>
                  <Text style={styles.scooterBadgeText}>Alexei ⚡ {courierSpeed}km/h</Text>
                </View>
              </View>
            </Marker>
          </MapView>
        ) : (
          /* High-Fidelity Illustrated Vector City Map (Guaranteed High-Res View) */
          <View style={styles.mapArea}>
            <Image
              source={require("../assets/images/tracking/map.png")}
              style={styles.mapImage}
              resizeMode="cover"
            />
            {/* Restaurant Starting Pin */}
            <View style={styles.restaurantPinWeb}>
              <View style={styles.restaurantPinBubble}>
                <Text style={styles.restaurantPinText}>Sushir Bhai 🍣</Text>
              </View>
              <View style={styles.restaurantMarker}>
                <Text style={{ fontSize: 14 }}>🍱</Text>
              </View>
            </View>

            {/* Route path breadcrumbs */}
            <View style={styles.routeDot1} />
            <View style={styles.routeDot2} />
            <View style={styles.routeDot3} />
            <View style={styles.routeDot4} />

            {/* Destination Home Pin */}
            <View style={styles.destinationPinWrapperWeb}>
              <View style={styles.destinationPinBubble}>
                <Text style={styles.destinationPinText}>Home 🏠</Text>
              </View>
              <Image
                source={require("../assets/images/tracking/pin.png")}
                style={styles.pinImage}
              />
            </View>

            {/* Real-Time Animated Scooter Courier Pin */}
            <View
              style={[
                styles.scooterMarkerWrapperWeb,
                {
                  top: vectorCoord.top,
                  left: vectorCoord.left,
                },
              ]}
            >
              <View style={styles.scooterHalo} />
              <Image
                source={require("../assets/images/tracking/scooter.png")}
                style={[
                  styles.scooterImage,
                  { transform: [{ rotate: `${vectorCoord.heading}deg` }] },
                ]}
              />
              <View style={styles.scooterBadge}>
                <Text style={styles.scooterBadgeText}>Alexei ⚡ {courierSpeed}km/h</Text>
              </View>
            </View>
          </View>
        )}

        {/* Floating Top Navigation & Live Connection Pill */}
        <SafeAreaView style={styles.topNavSafeArea}>
          <View style={styles.topNavBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityLabel="Go back"
              accessibilityRole="button"
              style={styles.floatingNavBtn}
              onPress={() => {
                triggerHaptic();
                router.back();
              }}
            >
              <Feather name="arrow-left" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            {/* Live Socket Connection & ETA Floating Pill */}
            <View style={styles.etaPill}>
              <View
                style={[
                  styles.etaLiveDot,
                  { backgroundColor: isConnected ? "#10B981" : "#FFB800" },
                ]}
              />
              <Text style={styles.etaPillText}>
                {etaMinutes > 0 ? `Arriving in ~${etaMinutes} mins` : "Arrived! 🍣"}
              </Text>
            </View>

            <View style={styles.topActionsRow}>
              {/* Map Provider Toggle */}
              {hasNativeMap && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  accessibilityLabel="Switch map mode"
                  style={styles.floatingNavBtn}
                  onPress={() => {
                    triggerHaptic();
                    setMapViewMode(mapViewMode === "vector" ? "native" : "vector");
                  }}
                >
                  <Ionicons
                    name={mapViewMode === "vector" ? "map-outline" : "image-outline"}
                    size={20}
                    color="#FF6B4A"
                  />
                </TouchableOpacity>
              )}

              {/* Live GPS Sim Trigger */}
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityLabel="Toggle live ride simulation"
                accessibilityRole="button"
                style={[styles.floatingNavBtn, isSimulating && styles.floatingNavBtnActive]}
                onPress={handleToggleSimulation}
              >
                <MaterialCommunityIcons
                  name={isSimulating ? "pause" : "play-speed"}
                  size={22}
                  color={isSimulating ? "#FFFFFF" : "#FF6B4A"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* Bottom Glassmorphic Tracking Sheet */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.bottomSheet}>
          <View style={styles.dragHandle} />

          {/* Status Header */}
          <View style={styles.sheetHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.statusTitle}>{statusTitle}</Text>
              <Text style={styles.statusSubtitle}>{statusSubtitle}</Text>
            </View>
            <View style={styles.orderIdBadge}>
              <Text style={styles.orderIdText}>#{orderId}</Text>
            </View>
          </View>

          {/* 4-Step Animated Delivery Lifecycle Progress */}
          <View style={styles.progressTracker}>
            <View style={styles.stepCol}>
              <View style={currentStep >= 1 ? styles.stepCirclePassed : styles.stepCircleFuture}>
                <Feather name="check" size={12} color={currentStep >= 1 ? "#FFF" : "#A1A1AA"} />
              </View>
              <Text style={currentStep >= 1 ? styles.stepLabelPassed : styles.stepLabelFuture}>
                Received
              </Text>
            </View>

            <View
              style={currentStep >= 2 ? styles.stepConnectorPassed : styles.stepConnectorFuture}
            />

            <View style={styles.stepCol}>
              <View style={currentStep >= 2 ? styles.stepCirclePassed : styles.stepCircleFuture}>
                <Feather name="check" size={12} color={currentStep >= 2 ? "#FFF" : "#A1A1AA"} />
              </View>
              <Text style={currentStep >= 2 ? styles.stepLabelPassed : styles.stepLabelFuture}>
                Prepared
              </Text>
            </View>

            <View
              style={currentStep >= 3 ? styles.stepConnectorPassed : styles.stepConnectorFuture}
            />

            <View style={styles.stepCol}>
              <View
                style={
                  currentStep === 3
                    ? styles.stepCircleActive
                    : currentStep > 3
                    ? styles.stepCirclePassed
                    : styles.stepCircleFuture
                }
              >
                <MaterialCommunityIcons
                  name="moped"
                  size={16}
                  color={currentStep >= 3 ? "#FFF" : "#A1A1AA"}
                />
              </View>
              <Text
                style={
                  currentStep === 3
                    ? styles.stepLabelActive
                    : currentStep > 3
                    ? styles.stepLabelPassed
                    : styles.stepLabelFuture
                }
              >
                On Way
              </Text>
            </View>

            <View
              style={currentStep >= 4 ? styles.stepConnectorPassed : styles.stepConnectorFuture}
            />

            <View style={styles.stepCol}>
              <View style={currentStep >= 4 ? styles.stepCirclePassed : styles.stepCircleFuture}>
                <Feather name="home" size={12} color={currentStep >= 4 ? "#FFF" : "#A1A1AA"} />
              </View>
              <Text style={currentStep >= 4 ? styles.stepLabelPassed : styles.stepLabelFuture}>
                Delivered
              </Text>
            </View>
          </View>

          {/* Courier Card */}
          <View style={styles.courierCard}>
            <Image
              source={require("../assets/images/tracking/driver.png")}
              style={styles.courierAvatar}
            />
            <View style={styles.courierInfo}>
              <Text style={styles.courierRole}>Your Deliverer • E-Scooter</Text>
              <Text style={styles.courierName}>Alexei Volkov</Text>
              <View style={styles.courierRatingRow}>
                <Ionicons name="star" size={13} color="#FFB800" />
                <Text style={styles.courierRatingText}>4.9 (1,840 deliveries)</Text>
              </View>
            </View>

            {/* Quick Action Buttons */}
            <View style={styles.courierActions}>
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityLabel="Chat with courier"
                accessibilityRole="button"
                style={styles.actionBtn}
                onPress={() => {
                  triggerHaptic();
                  router.push("/chat" as any);
                }}
              >
                <Feather name="message-circle" size={18} color="#FF6B4A" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityLabel="Call courier"
                accessibilityRole="button"
                style={[styles.actionBtn, styles.actionBtnCall]}
                onPress={handleCall}
              >
                <Feather name="phone" size={18} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>

          {/* View Details Action */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.detailsBtn}
            onPress={() => {
              triggerHaptic();
              Alert.alert(
                `Order #${orderId} Details`,
                "• 1x Salmon Nigiri Platter ($18.00)\n• 1x Dragon Roll Deluxe ($18.00)\n• Delivery: FREE\n• Tip: $3.00\nTotal: $39.00\n\nGPS: Real-time Socket.io stream 🟢"
              );
            }}
          >
            <Text style={styles.detailsBtnText}>View Receipt & Order Items</Text>
            <Feather name="chevron-right" size={16} color="#71717A" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  mapArea: {
    ...StyleSheet.absoluteFill,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  restaurantMarker: {
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF6B4A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantPinWeb: {
    position: "absolute",
    top: "56%",
    left: "14%",
    alignItems: "center",
  },
  restaurantPinBubble: {
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 4,
  },
  restaurantPinText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
  topActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  destinationPinWrapper: {
    alignItems: "center",
  },
  destinationPinWrapperWeb: {
    position: "absolute",
    top: "30%",
    right: "22%",
    alignItems: "center",
  },
  destinationPinBubble: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  destinationPinText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  pinImage: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  scooterMarkerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  scooterMarkerWrapperWeb: {
    position: "absolute",
    top: "42%",
    left: "26%",
    alignItems: "center",
  },
  scooterHalo: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255, 107, 74, 0.25)",
  },
  scooterImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  scooterBadge: {
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: -2,
  },
  scooterBadgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "800",
  },
  routeDot1: {
    position: "absolute",
    top: "44%",
    left: "40%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
    opacity: 0.6,
  },
  routeDot2: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
    opacity: 0.6,
  },
  routeDot3: {
    position: "absolute",
    top: "36%",
    left: "60%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
    opacity: 0.6,
  },
  routeDot4: {
    position: "absolute",
    top: "32%",
    left: "68%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B4A",
    opacity: 0.6,
  },
  topNavSafeArea: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
  },
  topNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 20 : 10,
  },
  floatingNavBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingNavBtnActive: {
    backgroundColor: "#FF6B4A",
  },
  etaPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  etaLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  etaPillText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 38 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 20,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  statusSubtitle: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
  },
  orderIdBadge: {
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  progressTracker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stepCol: {
    alignItems: "center",
    gap: 4,
  },
  stepCirclePassed: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF6B4A",
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleFuture: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabelPassed: {
    fontSize: 11,
    fontWeight: "700",
    color: "#10B981",
  },
  stepLabelActive: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  stepLabelFuture: {
    fontSize: 11,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  stepConnectorPassed: {
    flex: 1,
    height: 3,
    backgroundColor: "#10B981",
    marginBottom: 16,
  },
  stepConnectorFuture: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  courierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
  },
  courierAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF2EE",
  },
  courierInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courierRole: {
    fontSize: 11,
    fontWeight: "600",
    color: "#71717A",
  },
  courierName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 1,
  },
  courierRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  courierRatingText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },
  courierActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnCall: {
    backgroundColor: "#ECFDF5",
  },
  detailsBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#71717A",
  },
});