import React from "react";
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
import { Phone } from "../types";
import { PHONE_COLORS, colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
    phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
    const picked = route.params?.color;
    const shown = picked ?? phone.defaultColor;

    return (
        <SafeAreaView style={styles.root}>
            {/* Ảnh sản phẩm lớn */}
                <View style={styles.imageWrap}>
                    <Image
                        source={PHONE_COLORS[shown].image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Thông tin sản phẩm */}
                <View style={styles.info}>
                    <Text style={styles.name}>{phone.name}</Text>
                    <View style={styles.row}>
                        <Stars value={phone.rating} />
                        <Text style={styles.review}>
                            (Xem {phone.reviewCount} đánh giá)
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
                        <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.badge}>{phone.badge}</Text>
                    </View>

                    {/* TODO 1: Nút chọn màu */}
                    <Pressable
                        style={styles.chooseBtn}
                        onPress={() =>
                            navigation.navigate("ChooseColor", { color: picked })
                        }
                    >
                        <Text style={styles.chooseBtnText}>
                            {phone.colors.length} MÀU-{picked ? "CHỌN LOẠI" : "CHỌN MÀU"}
                        </Text>
                        <Text style={styles.chooseBtnArrow}>{">"}</Text>
                    </Pressable>
                </View>

                {/* TODO 2: Nút CHỌN MUA — sát đáy màn hình */}
                <Pressable style={styles.buyBtn}>
                    <Text style={styles.buyBtnText}>CHỌN MUA</Text>
                </Pressable>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
    imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { width: "80%", height: "80%" },
    info: { paddingBottom: 12 },
    name: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
        gap: 6,
    },
    review: { fontSize: 13, color: colors.darkGrey },
    price: { fontSize: 18, fontWeight: "bold", color: colors.red },
    oldPrice: {
        fontSize: 14,
        color: colors.darkGrey,
        textDecorationLine: "line-through",
    },
    badge: {
        fontSize: 12,
        color: colors.red,
        borderWidth: 1,
        borderColor: colors.red,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    chooseBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 8,
    },
    chooseBtnText: { fontSize: 14, color: colors.black },
    chooseBtnArrow: {
        position: "absolute",
        right: 12,
        fontSize: 16,
        color: colors.darkGrey,
    },
    buyBtn: {
        backgroundColor: colors.red,
        borderRadius: 6,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 16,
    },
    buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
