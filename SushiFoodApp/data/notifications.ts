import { Feather } from "@expo/vector-icons";

export interface NotificationItem {
  id: number;
  category: "All" | "Orders" | "Promotions";
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  time: string;
}

export const notifications: NotificationItem[] = [
  {
    id: 1,
    category: "Orders",
    icon: "truck",
    title: "Your order is on the way!",
    message:
      "Alexei just picked up your sushi from Sakura Sushi 🚴",
    time: "5 min",
  },

  {
    id: 2,
    category: "Promotions",
    icon: "tag",
    title: "Get 20% off Nigiri sets today only",
    message:
      "Today only! Treat yourself to fresh salmon nigiri 🍣",
    time: "1h",
  },

  {
    id: 3,
    category: "Promotions",
    icon: "gift",
    title: "Voucher Earned",
    message:
      "You earned a $5 voucher from your last order. Apply it at checkout!",
    time: "2h",
  },

  {
    id: 4,
    category: "Orders",
    icon: "check-circle",
    title: "Order Delivered",
    message:
      "Enjoy your meal! Don't forget to rate Sakura Sushi ⭐",
    time: "4h",
  },

  {
    id: 5,
    category: "Promotions",
    icon: "trending-up",
    title: "Trending Near You",
    message:
      "Tokyo Delights is getting popular, 100+ orders this week!",
    time: "8h",
  },
];