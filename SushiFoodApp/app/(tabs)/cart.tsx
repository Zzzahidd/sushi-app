import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Salmon Nigiri Set",
    description: "Fresh Atlantic salmon over seasoned rice (4 pcs)",
    price: 14.5,
    quantity: 2,
    image: require("../../assets/images/orders/salmon-nigiri.png"),
  },
  {
    id: 2,
    title: "Dragon Roll Deluxe",
    description: "Eel, avocado, cucumber with tobiko and eel glaze",
    price: 18.0,
    quantity: 1,
    image: require("../../assets/images/sushi/sushi2.png"),
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [promoCode, setPromoCode] = useState("SUSHIR20");
  const [promoApplied, setPromoApplied] = useState(true);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const updateQuantity = (id: number, delta: number) => {
    triggerHaptic();
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const deliveryFee = subtotal > 30 ? 0 : 2.99;
  const discount = promoApplied && subtotal > 0 ? subtotal * 0.2 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.itemCountBadge}>
            <Text style={styles.itemCountText}>{items.reduce((a, b) => a + b.quantity, 0)} items</Text>
          </View>
        </View>

        {items.length === 0 ? (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.emptyContainer}>
            <View style={styles.emptyCircle}>
              <Feather name="shopping-bag" size={48} color="#FF6B4A" />
            </View>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven&apos;t added any sushi delicacies yet. Explore our menu for fresh rolls!
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.browseButton}
              onPress={() => {
                triggerHaptic();
                router.push("/(tabs)/menu" as any);
              }}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Delivery Estimate Banner */}
            <Animated.View entering={FadeInDown.duration(300)} style={styles.etaBanner}>
              <View style={styles.etaIconCircle}>
                <Feather name="clock" size={18} color="#FF6B4A" />
              </View>
              <View style={styles.etaTextContainer}>
                <Text style={styles.etaTitle}>Estimated Delivery</Text>
                <Text style={styles.etaTime}>25 – 35 mins • Sushir Bhai Express</Text>
              </View>
            </Animated.View>

            {/* Cart Items List */}
            <View style={styles.itemsCard}>
              {items.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.itemRow}>
                    <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                    <View style={styles.itemDetails}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                      </View>
                      <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>

                      {/* Quantity Stepper */}
                      <View style={styles.qtyContainer}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Feather name={item.quantity === 1 ? "trash-2" : "minus"} size={14} color={item.quantity === 1 ? "#EF4444" : "#4B5563"} />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Feather name="plus" size={14} color="#FF6B4A" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {index < items.length - 1 && <View style={styles.itemDivider} />}
                </View>
              ))}
            </View>

            {/* Promo Code Box */}
            <Animated.View entering={FadeInDown.delay(100).duration(300)} style={styles.promoCard}>
              <View style={styles.promoInputRow}>
                <MaterialCommunityIcons name="ticket-percent-outline" size={22} color="#FF6B4A" />
                <TextInput
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  style={styles.promoInput}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={[styles.applyBtn, promoApplied && styles.appliedBtn]}
                  onPress={() => {
                    triggerHaptic();
                    setPromoApplied(!promoApplied);
                  }}
                >
                  <Text style={[styles.applyBtnText, promoApplied && styles.appliedBtnText]}>
                    {promoApplied ? "Applied ✓" : "Apply"}
                  </Text>
                </TouchableOpacity>
              </View>
              {promoApplied && (
                <Text style={styles.promoSuccessText}>🎉 20% Discount applied with code {promoCode}</Text>
              )}
            </Animated.View>

            {/* Bill Details */}
            <Animated.View entering={FadeInDown.delay(200).duration(300)} style={styles.billCard}>
              <Text style={styles.billHeading}>Order Summary</Text>
              
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</Text>
              </View>

              {promoApplied && (
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: "#10B981" }]}>Promo Discount (20%)</Text>
                  <Text style={[styles.billValue, { color: "#10B981", fontWeight: "700" }]}>
                    -${discount.toFixed(2)}
                  </Text>
                </View>
              )}

              <View style={styles.billDivider} />

              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </Animated.View>

            {/* Checkout Action Button */}
            <Animated.View entering={FadeInDown.delay(300).duration(300)}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.checkoutBtn}
                onPress={() => {
                  triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
                  router.push("/checkout" as any);
                }}
              >
                <View style={styles.checkoutBtnLeft}>
                  <Text style={styles.checkoutBtnTitle}>Proceed to Checkout</Text>
                  <Text style={styles.checkoutBtnSubtitle}>{items.length} unique items</Text>
                </View>
                <View style={styles.checkoutBtnRight}>
                  <Text style={styles.checkoutBtnPrice}>${total.toFixed(2)}</Text>
                  <Feather name="arrow-right" size={20} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        )}
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
  itemCountBadge: {
    backgroundColor: "#FFF2EE",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  itemCountText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 130,
  },
  etaBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  etaIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  etaTextContainer: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  etaTime: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
  },
  itemsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    paddingRight: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  itemDesc: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 2,
    lineHeight: 16,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#F4F4F5",
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 3,
    marginTop: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  itemDivider: {
    height: 1,
    backgroundColor: "#F4F4F5",
    marginVertical: 14,
  },
  promoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  promoInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  applyBtn: {
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  appliedBtn: {
    backgroundColor: "#ECFDF5",
  },
  applyBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  appliedBtnText: {
    color: "#10B981",
  },
  promoSuccessText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
    marginTop: 8,
    marginLeft: 4,
  },
  billCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  billHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 14,
    color: "#71717A",
  },
  billValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  billDivider: {
    height: 1,
    backgroundColor: "#F4F4F5",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  checkoutBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF6B4A",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 22,
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  checkoutBtnLeft: {},
  checkoutBtnTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  checkoutBtnSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  checkoutBtnRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkoutBtnPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 60,
  },
  emptyCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#71717A",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: "#FF6B4A",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 20,
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  browseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
