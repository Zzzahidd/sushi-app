import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "All",
  "Orders",
  "Promotions",
];

export default function NotificationTabs({
  active,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            active === tab &&
              styles.activeTab,
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              styles.text,
              active === tab &&
                styles.activeText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
  },

  tab: {
    height: 42,

    paddingHorizontal: 20,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    marginRight: 12,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  activeTab: {
    backgroundColor: "#FF5A36",
  },

  text: {
    fontSize: 15,
    color: "#777",
    fontWeight: "500",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});