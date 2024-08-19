import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditProfile = ({ navigation, route }) => {
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

  const handleSave = () => {
    // Add validation if needed
    const updatedProfile = { ...profile };
    navigation.navigate('Profile', { profile: updatedProfile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFEF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.profileContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>
          <Image
            source={require('../assets/ibrahim.jpg')} // Placeholder for profile picture
            style={styles.profilePicture}
          />
          <TextInput
            style={styles.input}
            placeholder="Fullname"
            value={profile.fullname}
            onChangeText={(text) => setProfile({ ...profile, fullname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={profile.role}
            onChangeText={(text) => setProfile({ ...profile, role: text })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    flex: 1,
  },
  profileContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20, // Ensure there's space at the bottom when scrolling
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
  saveButton: {
    backgroundColor: '#4682b4',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
