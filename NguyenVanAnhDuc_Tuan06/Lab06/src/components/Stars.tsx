import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

interface StarsProps {
  value: number;
  size?: number;
}

export function Stars({ value, size = 16 }: StarsProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i <= value ? "star" : "star-outline"}
        size={size}
        color={colors.yellow}
      />
    );
  }
  return <View style={styles.row}>{stars}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
});
