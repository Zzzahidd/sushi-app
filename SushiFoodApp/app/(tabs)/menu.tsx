import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import MenuCategories from "../../components/menu/MenuCategories";
import MenuHeader from "../../components/menu/MenuHeader";
import OfferBanner from "../../components/menu/OfferBanner";
import PopularSection from "../../components/menu/PopularSection";

export default function MenuScreen() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8F8F8"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}

          <MenuHeader
            onSearchPress={() =>
              console.log("Search")
            }
          />

          {/* Categories */}

          <MenuCategories />

          {/* Offer Banner */}

          <OfferBanner />

          {/* Popular Dishes */}

          <PopularSection />
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

  content: {
    paddingBottom: 120,
  },
});