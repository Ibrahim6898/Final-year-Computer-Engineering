import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InventoryScreen from '../screens/InventoryScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import EditItemScreen from '../screens/EditItemScreen';
import AddItemScreen from '../screens/AddItemScreen';

const Stack = createStackNavigator();

export default function InventoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
      <Stack.Screen name="EditItemScreen" component={EditItemScreen} />
      <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
    </Stack.Navigator>
  );
}
