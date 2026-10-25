import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone, ColorKey } from "../types";
import { PHONE_COLORS, COLOR_ORDER, colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      {/* Nửa trên: header trắng — ảnh nhỏ + thông tin */}
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: Chỉ hiện khi đã chọn màu */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {PHONE_COLORS[picked].label}
                </Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi{" "}
                <Text style={{ fontWeight: "bold" }}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.small, { fontWeight: "bold" }]}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Nửa dưới: body xám — 4 ô màu + nút XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: Nút XONG */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked })
          }
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  thumb: { width: 80, height: 80 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 13, color: colors.black },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 14, color: colors.darkGrey, marginBottom: 12 },
  swatches: { gap: 12 },
  swatch: {
    width: "100%",
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchOn: { borderColor: colors.black, borderWidth: 3 },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  doneBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
