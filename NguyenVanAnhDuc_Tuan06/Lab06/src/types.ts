export type ColorKey = "xanh" | "đỏ" | "đen" | "trắng";

export interface PhoneColor {
  hex: string;
  label: string;
  image: any; // require() returns number at runtime
}

export interface Phone {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  badge: string;
  colors: ColorKey[];
  defaultColor: ColorKey;
}
