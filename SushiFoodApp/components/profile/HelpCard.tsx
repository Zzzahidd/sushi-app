import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";

import MenuItem from "./MenuItem";

export default function HelpCard() {
  return (
    <View style={styles.card}>
      <MenuItem
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,

    backgroundColor: "#FFF",

    borderRadius: 24,

    paddingHorizontal: 18,

    elevation: 5,
  },
});


//
       //icon="help-circle"
       // title="Help & Support"
        //subtitle="Contact us or FAQs"