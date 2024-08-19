import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState({
    fullname: 'Ibrahim Yakubu Ahmad',
    email: 'ibrahimyakubuahmad@outlook.com',
    phone: '+2347068985927',
    role: 'Manager',
  });

  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFEF" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={32} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        {/* Removed the edit button */}
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/ibrahim.jpg')} // Placeholder for profile picture
          style={styles.profilePicture}
        />
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          value={profile.fullname}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profile.email}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={profile.phone}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={profile.role}
          editable={false}
        />
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', { profile })}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#4682b4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Allows the title to take up available space
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  editButton: {
    backgroundColor: '#2F80ED',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
