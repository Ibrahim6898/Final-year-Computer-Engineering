import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReportScreen from '../screens/ReportScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AlertSettingsScreen from '../screens/AlertSettingsScreen';

const Stack = createStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false,  // Disable default header
      }}>
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AlertSettingsScreen" component={AlertSettingsScreen} />
    </Stack.Navigator>
  );
}
