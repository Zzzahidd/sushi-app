import { Feather } from "@expo/vector-icons";

export interface ProfileMenuItem {
  id: number;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  route?: string;
}

export const profileMenu: ProfileMenuItem[] = [
  {
    id: 1,
    icon: "file-text",
    title: "My Orders",
    subtitle: "View past & ongoing orders",
    route: "/orders",
  },
  {
    id: 2,
    icon: "heart",
    title: "Favorites",
    subtitle: "See your saved dishes",
    route: "/favorites",
  },
  {
    id: 3,
    icon: "tag",
    title: "My Vouchers",
    subtitle: "Check available discounts",
    route: "/vouchers",
  },
  {
    id: 4,
    icon: "credit-card",
    title: "Payment Methods",
    subtitle: "Manage cards & wallets",
    route: "/payment-methods",
  },
];