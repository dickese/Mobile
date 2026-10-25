import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS, colors, formatPrice } from "../theme";
import { Stars } from "./Stars";

interface ProductCardProps {
  phone: Phone;
  onPress?: () => void;
}

export function ProductCard({ phone, onPress }: ProductCardProps) {
  const imageSource =
    typeof (phone as any).image === "string"
      ? { uri: (phone as any).image }
      : (phone as any).image ??
        (phone.defaultColor && PHONE_COLORS[phone.defaultColor]
          ? PHONE_COLORS[phone.defaultColor].image
          : PHONE_COLORS.xanh.image);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.card} activeOpacity={0.7} onPress={onPress}>
      {/* Cột trái: Ảnh sản phẩm */}
      <View style={styles.imageWrap}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>

      {/* Cột phải: Thông tin chi tiết */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {phone.name}
        </Text>

        {/* Đánh giá sao & số lượt xem */}
        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={14} />
          <Text style={styles.reviewCount}>({phone.reviewCount})</Text>
        </View>

        {/* Giá hiện tại & Giá cũ */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice ? (
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          ) : null}
        </View>

        {/* Badge & Nhà cung cấp */}
        <View style={styles.metaRow}>
          {phone.badge ? (
            <View style={styles.badgeWrap}>
              <Text style={styles.badge}>{phone.badge}</Text>
            </View>
          ) : null}
          {phone.supplier ? (
            <Text style={styles.supplier}>{phone.supplier}</Text>
          ) : null}
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
  },
  imageWrap: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.darkGrey,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.darkGrey,
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeWrap: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badge: {
    fontSize: 11,
    color: colors.red,
    fontWeight: "500",
  },
  supplier: {
    fontSize: 11,
    color: colors.darkGrey,
  },
});
