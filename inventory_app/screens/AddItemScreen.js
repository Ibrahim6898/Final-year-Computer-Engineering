// import React, { useState, useContext, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Platform, Image, ScrollView } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { InventoryContext } from '../Context/InventoryContext';
// import { createItem } from '../firebase/inventory_service'

// export default function AddItemScreen({ navigation }) {
//   const [itemName, setItemName] = useState('');
//   const [description, setDescription] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);
//   const { addItem } = useContext(InventoryContext);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

//   const handleAddItem = async () => {
//     if (itemName && description && quantity && category && price) {
//       const newItem = { 
//         name: itemName, 
//         description, 
//         quantity: parseInt(quantity), 
//         category, 
//         price: parseFloat(price), 
//         image 
//       };
  
//       // Attempt to add the item to Firebase
//       try {
//         await createItem(newItem);
//         Alert.alert('Success', 'Item added to Firebase successfully');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to add item to Firebase');
//         return; // Exit the function if the operation fails
//       }
  
//       // Alert the user about item addition and reset fields
//       Alert.alert('Item Added', `Name: ${itemName}\nDescription: ${description}\nQuantity: ${quantity}\nCategory: ${category}\nPrice: ${price}`);
      
//       // Reset the input fields
//       setItemName('');
//       setDescription('');
//       setQuantity('');
//       setCategory('');
//       setPrice('');
//       setImage(null);
  
//     } else {
//       Alert.alert('Error', 'Please fill in all fields');
//     }
//   };
  

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//           <MaterialIcons name="menu" size={32} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add Item</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//           <MaterialIcons name="notifications" size={32} color="white" />
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
//             {image ? (
//               <Image source={{ uri: image }} style={styles.image} />
//             ) : (
//               <Text style={styles.imagePlaceholder}>Add Image</Text>
//             )}
//           </TouchableOpacity>
//           <Text style={styles.label}>Item Name</Text>
//           <TextInput
//             style={styles.input}
//             value={itemName}
//             onChangeText={setItemName}
//             placeholder="Enter item name"
//             placeholderTextColor="#999"
//           />
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Enter item description"
//             placeholderTextColor="#999"
//           />
//           <Text style={styles.label}>Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={quantity}
//             onChangeText={setQuantity}
//             placeholder="Enter item quantity"
//             placeholderTextColor="#999"
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Category</Text>
//           <TextInput
//             style={styles.input}
//             value={category}
//             onChangeText={setCategory}
//             placeholder="Enter item category"
//             placeholderTextColor="#999"
//           />
//           <Text style={styles.label}>Price</Text>
//           <TextInput
//             style={styles.input}
//             value={price}
//             onChangeText={setPrice}
//             placeholder="Enter item price in Naira"
//             placeholderTextColor="#999"
//             keyboardType="numeric"
//           />
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
//               <Text style={styles.buttonText}>Add Item</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: "#4682b4",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   scrollContainer: {
//     paddingVertical: 16,
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#EFEFEF',
//   },
//   imageContainer: {
//     height: 230,
//     width: '100%',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 16,
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     borderRadius: 8,
//   },
//   imagePlaceholder: {
//     fontSize: 16,
//     color: '#999',
//   },
//   label: {
//     fontSize: 16,
//     marginVertical: 8,
//     color: '#333',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   addButton: {
//     backgroundColor: '#03DAC6',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Platform, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { InventoryContext } from '../Context/InventoryContext';
import { saveItemDetails, uploadImage } from '../firebase/inventory_service'; // Import the functions

export default function AddItemScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { addItem } = useContext(InventoryContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleAddItem = async () => {
    if (itemName && description && quantity && category && price) {
      try {
          await saveItemDetails({
          name: itemName,
          description,
          quantity: parseInt(quantity),
          category,
          price: parseFloat(price),
          image,
        });

        Alert.alert('Success', 'Item added to Firebase successfully');

        // Reset the input fields
        setItemName('');
        setDescription('');
        setQuantity('');
        setCategory('');
        setPrice('');
        setImage(null);

      } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Failed to add item to Firebase');
      }

      // Alert the user about item addition
      Alert.alert('Item Added', `Name: ${itemName}\nDescription: ${description}\nQuantity: ${quantity}\nCategory: ${category}\nPrice: ${price}`);
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
      setImage(result.assets[0].uri);
      console.log(result)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Item</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <MaterialIcons name="notifications" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imagePlaceholder}>Add Image</Text>
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
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.buttonText}>Add Item</Text>
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
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  addButton: {
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
