import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabNavigator from "./TabNavigator"; // Assuming this includes your tab-based navigation
import AddItemStack from "./AddItemStack";
import ReportsStack from "./ReportsStack";
import InventoryStack from "./InventoryStack";
import CustomDrawerContent from "./CustomDrawerContent";
import ProfileStack from "../navigation/ProfileStack"; // Import the ProfileStack

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Item"
        component={AddItemStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportsStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="warehouse"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
