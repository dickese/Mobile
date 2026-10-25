import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, TabParamList } from "./types";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Products: ["grid", "grid-outline"],
  Favorites: ["heart", "heart-outline"],
};

// TODO 1: function HomeTabs() — Tab.Navigator (headerShown:false) với 2 Tab.Screen:
//         "Products" (ProductsTab) và "Favorites" (FavoritesTab), mỗi tab có icon Ionicons.
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={ICONS[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{ title: "Sản phẩm" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{ title: "Yêu thích" }}
      />
    </Tab.Navigator>
  );
}

// TODO 2: export function StackTabApp() — <FavoritesProvider><NavigationContainer><Stack.Navigator>
//         Stack.Screen "Home" (component HomeTabs, title "Cửa hàng")
//         Stack.Screen "ProductDetails" (component ProductDetailsScreen, title "Chi tiết sản phẩm")
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: colors.black,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: "Cửa hàng" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
