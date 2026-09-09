import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CheckoutProductCard from "../../components/checkout/CheckoutProductCard";
import PriceSummary from "../../components/checkout/PriceSummary";
import { checkoutItems } from "../../data/checkoutData";

export default function CartScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cart</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {checkoutItems.map((item) => (
            <CheckoutProductCard key={item.id} item={item} />
          ))}

          <PriceSummary />

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/checkout" as any)}
          >
            <Text style={styles.buttonText}>Proceed to Checkout</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  content: {
    paddingTop: 10,
    paddingBottom: 110,
  },
  checkoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 58,
    backgroundColor: "#FF6B4A",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#FF6B4A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
