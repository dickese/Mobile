import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { PHONES } from "../data/phones";
import { PHONE_COLORS, colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params; // TODO 4: lấy id rồi tìm phone trong PHONES
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5: không tìm thấy → "Không tìm thấy sản phẩm #id"
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFav = has(phone.id);
  const imageSource =
    phone.defaultColor && PHONE_COLORS[phone.defaultColor]
      ? PHONE_COLORS[phone.defaultColor].image
      : PHONE_COLORS.xanh.image;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* TODO 6: hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp */}
      <View style={styles.imageCard}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.reviewCount}>({phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice ? (
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          ) : null}
        </View>

        {phone.supplier ? (
          <View style={styles.supplierRow}>
            <Text style={styles.supplierLabel}>Nhà cung cấp: </Text>
            <Text style={styles.supplierValue}>{phone.supplier}</Text>
          </View>
        ) : null}

        {phone.badge ? (
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{phone.badge}</Text>
          </View>
        ) : null}

        {/* TODO 7: nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id) */}
        <Pressable
          style={[styles.favBtn, isFav && styles.favBtnActive]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={[styles.favBtnText, isFav && styles.favBtnTextActive]}>
            {isFav ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  imageCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 240,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
    lineHeight: 24,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.darkGrey,
    textDecorationLine: "line-through",
  },
  supplierRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  supplierLabel: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  supplierValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  badgeWrap: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    color: colors.red,
    fontWeight: "600",
  },
  favBtn: {
    borderWidth: 1.5,
    borderColor: colors.red,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  favBtnActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.red,
  },
  favBtnTextActive: {
    color: "#fff",
  },
});
