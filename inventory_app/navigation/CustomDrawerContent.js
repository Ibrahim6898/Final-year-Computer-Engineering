import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Import the local profile image
import profileImage from '../assets/ibrahim.jpg'; // Adjust path as needed

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={() => props.navigation.navigate('Profile')} // Navigate to Profile screen on press
      >
        <View style={styles.profileImageContainer}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Ibrahim Yakubu</Text>
      </TouchableOpacity>
      
      <View style={styles.drawerItemListContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 20, // Adjust this value to add padding at the top
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 60, // Diameter of the circle
    height: 60, // Diameter of the circle
    borderRadius: 30, // Half of the width/height to make it a circle
    backgroundColor: '#d3d3d3', // Background color if no image
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileImage: {
    width: 60, // Diameter of the circle
    height: 60, // Diameter of the circle
    borderRadius: 30, // Half of the width/height to make it a circle
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerItemListContainer: {
    marginTop: 20, // Adjust this value to move the DrawerItemList down
  },
});
