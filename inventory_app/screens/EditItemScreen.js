import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, StatusBar, Platform, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { InventoryContext } from '../Context/InventoryContext';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [itemName, setItemName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price.toString());
  const [image, setImage] = useState(item.image);
  const { updateItem } = useContext(InventoryContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleEditItem = () => {
    if (itemName && description && quantity && category && price) {
      updateItem({ ...item, name: itemName, description, quantity: parseInt(quantity), category, price: parseFloat(price), image });
      Alert.alert('Item Updated', `Name: ${itemName}\nDescription: ${description}\nQuantity: ${quantity}\nCategory: ${category}\nPrice: ${price}`);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Item</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imagePlaceholder}>Edit Image</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Enter item name"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter item description"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter item quantity"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Enter item category"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter item price in Naira"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditItem}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  scrollContainer: {
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFEFEF',
  },
  imageContainer: {
    height: 230,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20
  },
  editButton: {
    backgroundColor: '#03DAC6',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
