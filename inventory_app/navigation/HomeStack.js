import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import EditItemScreen from '../screens/EditItemScreen';


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false,  // Disable default header
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="EditItem" component={EditItemScreen} />

    </Stack.Navigator>
  );
}