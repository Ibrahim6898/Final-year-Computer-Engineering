import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { InventoryContext } from '../Context/InventoryContext'; // Ensure this path is correct

export default function NotificationScreen({ navigation }) {
  const { notifications } = useContext(InventoryContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AlertSettingsScreen')}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {notifications.map(notification => (
          <View key={notification.id} style={styles.notification}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={notification.icon} size={24} color="#4682b4" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.timeText}>2 hours ago</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#4682b4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
  },
  timeText: {
    fontSize: 12,
    color: '#aaa',
  },
});
