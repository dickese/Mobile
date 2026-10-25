import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { Phone } from "../types";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { colors } from "../theme";
import { fetchPhone } from "../api/phoneApi";

function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.center}>
      <Text style={styles.error}>{message}</Text>
      <Pressable style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={styles.loadingText}>Đang tải...</Text>
    </View>
  );
}

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      setPhone(await fetchPhone("1"));
    } catch (e: any) {
      setError(e.message ?? "Đã xảy ra lỗi");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;

  if (!phone) return <Loading />;

  return <SelectPhoneApp phone={phone} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  error: {
    fontSize: 16,
    color: colors.red,
    textAlign: "center",
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  loadingText: { marginTop: 12, fontSize: 14, color: colors.darkGrey },
});
