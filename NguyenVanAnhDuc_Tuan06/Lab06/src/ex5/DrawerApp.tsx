import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { SettingsProvider, useSettings } from "./SettingsContext";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Icons mapping for Drawer items: [focused, unfocused]
const ICONS: Record<
  keyof DrawerParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Profile: ["person", "person-outline"],
  Settings: ["settings", "settings-outline"],
};

// ---- HomeScreen ----
export function HomeScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <Text style={[s.big, dark && s.darkText]}>Xin chào 👋</Text>
    </View>
  );
}

// ---- ProfileScreen ----
export function ProfileScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, dark && s.darkText]}>Nguyễn Văn An</Text>
      <Text style={[s.muted, dark && s.darkMuted]}>an.nguyen@example.com</Text>
    </View>
  );
}

// ---- TODO 1 & TODO 3: SettingsScreen ----
// 2 state: notify (mặc định true) và dark (mặc định false) lấy từ Context (TODO 3 nâng cao)
// Mỗi dòng: <Text>Nhận thông báo</Text> <Switch value={notify} onValueChange={setNotify} />
// Dòng cuối hiển thị: "Thông báo: BẬT/TẮT · Giao diện: tối/sáng".
export function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();

  return (
    <View style={[s.container, dark && s.darkBg]}>
      <View style={[s.card, dark && s.darkCard]}>
        <View style={s.row}>
          <Text style={[s.label, dark && s.darkText]}>Nhận thông báo</Text>
          <Switch
            value={notify}
            onValueChange={setNotify}
            trackColor={{ false: colors.lightGrey, true: colors.red }}
            thumbColor={colors.white}
          />
        </View>

        <View style={[s.separator, dark && s.darkSeparator]} />

        <View style={s.row}>
          <Text style={[s.label, dark && s.darkText]}>Chế độ tối</Text>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: colors.lightGrey, true: colors.red }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <View style={s.statusContainer}>
        <Text style={[s.statusText, dark && s.darkMuted]}>
          Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
        </Text>
      </View>
    </View>
  );
}

// ---- DrawerNavigator Content ----
function DrawerNavigator() {
  const { dark } = useSettings();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: dark ? "#A0A0A0" : colors.darkGrey,
        drawerStyle: {
          backgroundColor: dark ? "#1E1E1E" : "#FFFFFF",
          width: 280,
        },
        headerStyle: {
          backgroundColor: dark ? "#1E1E1E" : "#FFFFFF",
          elevation: 2,
          shadowOpacity: 0.1,
        },
        headerTintColor: dark ? "#FFFFFF" : colors.black,
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons
            name={ICONS[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Cá nhân" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Cài đặt" }}
      />
    </Drawer.Navigator>
  );
}

// Inner container that reacts to dark theme
function DrawerAppContent() {
  const { dark } = useSettings();

  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

// ---- TODO 2 & TODO 3: export function DrawerApp() ----
export function DrawerApp() {
  return (
    <SettingsProvider>
      <DrawerAppContent />
    </SettingsProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  big: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 6,
  },
  muted: {
    fontSize: 15,
    color: colors.darkGrey,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
  },
  separator: {
    height: 1,
    backgroundColor: "#EBEBEB",
  },
  statusContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "500",
  },
  // Dark mode styles
  darkBg: {
    backgroundColor: "#121212",
  },
  darkCard: {
    backgroundColor: "#1E1E1E",
  },
  darkText: {
    color: "#FFFFFF",
  },
  darkMuted: {
    color: "#AAAAAA",
  },
  darkSeparator: {
    backgroundColor: "#2E2E2E",
  },
});
