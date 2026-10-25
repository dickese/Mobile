import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { ProductCard } from "../components/ProductCard";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";
import { colors } from "../theme";

const ProductRow = ProductCard;

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favoritePhones = PHONES.filter((p) => ids.includes(p.id));

  if (favoritePhones.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePhones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 15,
    color: colors.darkGrey,
  },
});
