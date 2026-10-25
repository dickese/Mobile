import { ColorKey, PhoneColor } from "./types";

export const colors = {
  red: "#E53935",
  blue: "#1E88E5",
  grey: "#F5F5F5",
  white: "#FFFFFF",
  black: "#212121",
  darkGrey: "#757575",
  lightGrey: "#E0E0E0",
  yellow: "#FFC107",
};

export const PHONE_COLORS: Record<ColorKey, PhoneColor> = {
  xanh: {
    hex: "#007AFF",
    label: "Xanh dương",
    image: require("../assets/phones/xanh.png"),
  },
  đỏ: {
    hex: "#FF3B30",
    label: "Đỏ",
    image: require("../assets/phones/đỏ.png"),
  },
  đen: {
    hex: "#1C1C1E",
    label: "Đen",
    image: require("../assets/phones/đen.png"),
  },
  trắng: {
    hex: "#F2F2F7",
    label: "Trắng",
    image: require("../assets/phones/trắng.png"),
  },
};

export const COLOR_ORDER: ColorKey[] = ["xanh", "đỏ", "đen", "trắng"];

export function formatPrice(n: number): string {
  return n.toLocaleString("vi-VN") + " đ";
}
