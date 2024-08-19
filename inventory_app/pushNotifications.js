import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
}

export function setupNotificationListeners() {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received while app is in the foreground:', notification);
  });

  return notificationListener;
}

export function setupResponseListener() {
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with the notification:', response);
      // Handle the notification response here (e.g., navigate to a specific screen)
    });
  
    return responseListener;
  }
  