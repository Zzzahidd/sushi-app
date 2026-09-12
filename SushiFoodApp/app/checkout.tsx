import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { checkoutItems } from "../data/checkoutData";

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [tip, setTip] = useState(3.0);
  const [isContactless, setIsContactless] = useState(true);
  const [instructions, setInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerHaptic = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style);
      }
    } catch (_) {}
  };

  const subtotal = 32.5;
  const deliveryFee = 0.0; // Free delivery promotion
  const discount = 6.5;
  const total = subtotal + deliveryFee - discount + tip;

  const handlePlaceOrder = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.replace("/live-tracking" as any);
    }, 800);
  };

  return (
    <>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              triggerHaptic();
              router.back();
            }}
          >
            <Feather name="arrow-left" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Delivery Location Section */}
          <Animated.View entering={FadeInDown.duration(300)} style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWithIcon}>
                <View style={[styles.sectionIconCircle, { backgroundColor: "#FFF2EE" }]}>
                  <Feather name="map-pin" size={16} color="#FF6B4A" />
                </View>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  router.push("/delivery-address" as any);
                }}
              >
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                setSelectedAddress("home");
              }}
              style={[
                styles.addressItem,
                selectedAddress === "home" && styles.addressItemActive,
              ]}
            >
              <View style={styles.addressLeft}>
                <View style={styles.radioCircle}>
                  {selectedAddress === "home" && <View style={styles.radioDot} />}
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>Home (Apartment 4B)</Text>
                  <Text style={styles.addressDetail}>742 Evergreen Terrace, Springfield</Text>
                  <Text style={styles.addressNote}>⚡ 25-30 min delivery</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                setSelectedAddress("office");
              }}
              style={[
                styles.addressItem,
                selectedAddress === "office" && styles.addressItemActive,
              ]}
            >
              <View style={styles.addressLeft}>
                <View style={styles.radioCircle}>
                  {selectedAddress === "office" && <View style={styles.radioDot} />}
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>Work Office</Text>
                  <Text style={styles.addressDetail}>100 Tech Boulevard, Suite 300</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Delivery Note */}
            <View style={styles.noteInputWrapper}>
              <Feather name="message-square" size={16} color="#71717A" />
              <TextInput
                placeholder="Add delivery note for driver (e.g. ring doorbell)..."
                value={instructions}
                onChangeText={setInstructions}
                style={styles.noteInput}
                placeholderTextColor="#A1A1AA"
              />
            </View>

            {/* Contactless Toggle */}
            <View style={styles.contactlessRow}>
              <View style={styles.contactlessLeft}>
                <MaterialCommunityIcons name="hand-front-right-outline" size={20} color="#FF6B4A" />
                <View>
                  <Text style={styles.contactlessTitle}>Contactless Delivery</Text>
                  <Text style={styles.contactlessSub}>Driver leaves food at your door</Text>
                </View>
              </View>
              <Switch
                value={isContactless}
                onValueChange={(val) => {
                  triggerHaptic();
                  setIsContactless(val);
                }}
                trackColor={{ false: "#E2E8F0", true: "#FF6B4A" }}
                thumbColor="#FFF"
              />
            </View>
          </Animated.View>

          {/* Payment Method Section */}
          <Animated.View entering={FadeInDown.delay(100).duration(300)} style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWithIcon}>
                <View style={[styles.sectionIconCircle, { backgroundColor: "#ECFDF5" }]}>
                  <Feather name="credit-card" size={16} color="#10B981" />
                </View>
                <Text style={styles.sectionTitle}>Payment Method</Text>
              </View>
            </View>

            {/* Mastercard */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                setSelectedPayment("card");
              }}
              style={[
                styles.paymentItem,
                selectedPayment === "card" && styles.paymentItemActive,
              ]}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.paymentLogoCircle}>
                  <Ionicons name="card" size={18} color="#FF6B4A" />
                </View>
                <View>
                  <Text style={styles.paymentTitle}>Mastercard •••• 4242</Text>
                  <Text style={styles.paymentSub}>Expires 08/28</Text>
                </View>
              </View>
              <View style={styles.radioCircle}>
                {selectedPayment === "card" && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            {/* Apple Pay / Google Pay */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                setSelectedPayment("apple");
              }}
              style={[
                styles.paymentItem,
                selectedPayment === "apple" && styles.paymentItemActive,
              ]}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#1A1A1A" }]}>
                  <Ionicons name="logo-apple" size={18} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.paymentTitle}>Apple Pay / Google Pay</Text>
                  <Text style={styles.paymentSub}>Instant & Secure checkout</Text>
                </View>
              </View>
              <View style={styles.radioCircle}>
                {selectedPayment === "apple" && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            {/* Cash on Delivery */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerHaptic();
                setSelectedPayment("cash");
              }}
              style={[
                styles.paymentItem,
                selectedPayment === "cash" && styles.paymentItemActive,
              ]}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#F0FDF4" }]}>
                  <Feather name="dollar-sign" size={18} color="#16A34A" />
                </View>
                <View>
                  <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                  <Text style={styles.paymentSub}>Pay driver with cash upon arrival</Text>
                </View>
              </View>
              <View style={styles.radioCircle}>
                {selectedPayment === "cash" && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Courier Tip Selector */}
          <Animated.View entering={FadeInDown.delay(200).duration(300)} style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleWithIcon}>
                <View style={[styles.sectionIconCircle, { backgroundColor: "#FEF3C7" }]}>
                  <Ionicons name="heart" size={16} color="#D97706" />
                </View>
                <Text style={styles.sectionTitle}>Tip Your Courier</Text>
              </View>
              <Text style={styles.tipSub}>100% goes to driver</Text>
            </View>

            <View style={styles.tipRow}>
              {[1.5, 3.0, 5.0, 7.0].map((val) => {
                const isSelected = tip === val;
                return (
                  <TouchableOpacity
                    key={val}
                    activeOpacity={0.8}
                    onPress={() => {
                      triggerHaptic();
                      setTip(val);
                    }}
                    style={[styles.tipBtn, isSelected && styles.tipBtnActive]}
                  >
                    <Text style={[styles.tipBtnText, isSelected && styles.tipBtnTextActive]}>
                      ${val.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Final Summary Card */}
          <Animated.View entering={FadeInDown.delay(300).duration(300)} style={styles.sectionCard}>
            <Text style={styles.summaryTitle}>Payment Breakdown</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items Subtotal</Text>
              <Text style={styles.summaryVal}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={[styles.summaryVal, { color: "#10B981" }]}>FREE</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: "#10B981" }]}>Voucher Discount (20%)</Text>
              <Text style={[styles.summaryVal, { color: "#10B981", fontWeight: "700" }]}>-${discount.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Courier Tip</Text>
              <Text style={styles.summaryVal}>${tip.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.finalTotalLabel}>Total to Pay</Text>
              <Text style={styles.finalTotalVal}>${total.toFixed(2)}</Text>
            </View>
          </Animated.View>

          {/* Place Order CTA Button */}
          <Animated.View entering={FadeInDown.delay(400).duration(300)}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.placeOrderBtn, isSubmitting && { opacity: 0.7 }]}
              onPress={handlePlaceOrder}
              disabled={isSubmitting}
            >
              <Text style={styles.placeOrderText}>
                {isSubmitting ? "Placing Your Order..." : `Place Order • $${total.toFixed(2)}`}
              </Text>
              <Feather name="arrow-right" size={20} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
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
    paddingBottom: 12,
  },
  backBtn: {
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  changeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6B4A",
  },
  addressItem: {
    borderWidth: 1.5,
    borderColor: "#F4F4F5",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  addressItemActive: {
    borderColor: "#FF6B4A",
    backgroundColor: "#FFF9F8",
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginRight: 12,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF6B4A",
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  addressDetail: {
    fontSize: 13,
    color: "#71717A",
    marginTop: 2,
  },
  addressNote: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6B4A",
    marginTop: 4,
  },
  noteInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    marginTop: 4,
    marginBottom: 12,
  },
  noteInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#1A1A1A",
  },
  contactlessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F4F4F5",
  },
  contactlessLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactlessTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  contactlessSub: {
    fontSize: 12,
    color: "#71717A",
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F4F4F5",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  paymentItemActive: {
    borderColor: "#FF6B4A",
    backgroundColor: "#FFF9F8",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLogoCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF2EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  paymentSub: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 1,
  },
  tipSub: {
    fontSize: 12,
    color: "#71717A",
  },
  tipRow: {
    flexDirection: "row",
    gap: 10,
  },
  tipBtn: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tipBtnActive: {
    backgroundColor: "#FF6B4A",
    borderColor: "#FF6B4A",
  },
  tipBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  tipBtnTextActive: {
    color: "#FFFFFF",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#71717A",
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#F4F4F5",
    marginVertical: 10,
  },
  finalTotalLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  finalTotalVal: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FF6B4A",
  },
  placeOrderBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B4A",
    borderRadius: 22,
    paddingVertical: 18,
    shadowColor: "#FF6B4A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
    gap: 10,
    marginTop: 6,
  },
  placeOrderText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});