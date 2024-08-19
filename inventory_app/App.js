import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { InventoryProvider } from './Context/InventoryContext';
import { registerForPushNotificationsAsync, setupNotificationListeners, setupResponseListener } from './pushNotifications';  
import './firebase/config';  // Firebase configuration

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();  // Register for push notifications

    const notificationListener = setupNotificationListeners();  // Listen for notifications
    const responseListener = setupResponseListener();  // Listen for notification responses

    // Clean up listeners when the app unmounts
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <InventoryProvider>
        <DrawerNavigator />
      </InventoryProvider>
    </NavigationContainer>
  );
}
