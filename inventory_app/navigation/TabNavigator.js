import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import AddItemStack from './AddItemStack';
import ReportsStack from './ReportsStack';
import InventoryStack from './InventoryStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'AddItem') {
            iconName = 'plus-box';
          } else if (route.name === 'Report') {
            iconName = 'chart-bar';
          } else if (route.name === 'Inventory') {
            iconName = 'warehouse';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4682b4',
        tabBarInactiveTintColor: '#1F1F22',
        headerShown: false, // Disable header for TabNavigator
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="AddItem" component={AddItemStack} />
      <Tab.Screen name="Report" component={ReportsStack} />
      <Tab.Screen name="Inventory" component={InventoryStack} />
    </Tab.Navigator>
  );
}
