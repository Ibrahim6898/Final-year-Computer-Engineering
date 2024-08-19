import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryContext } from '../Context/InventoryContext';

export default function ItemDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const { updateItemQuantity } = useContext(InventoryContext);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateItemQuantity(item.id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateItemQuantity(item.id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Detail</Text>
      </View>
      <View style={styles.body}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>QTY: {quantity}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDecrease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleIncrease}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.price}>₦{item.price}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
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
  body: {
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 380,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
    width: '100%',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  quantity: {
    fontSize: 14,
    color: '#777',
    marginRight: 20,
    textAlign: 'left',
    width: '60%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    width: '100%',
  },
});
