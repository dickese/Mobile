import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { ProductCard } from "../components/ProductCard";
import { TabProps } from "./types";

const ProductRow = ProductCard;

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <View style={styles.container}>
      <FlatList
        data={PHONES}
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
});
