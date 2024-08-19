import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { InventoryContext } from '../Context/InventoryContext';

export default function InventoryScreen() {
  const navigation = useNavigation(); // Using useNavigation hook here
  const { items, deleteItem } = useContext(InventoryContext);

  const handleEdit = (item) => {
    navigation.navigate('EditItemScreen', { item });
  };

  const handleDelete = (id) => {
    deleteItem(id); // This will automatically trigger a notification
  };

  const handleDetails = (item) => {
    console.log("Navigating to ItemDetail with item:", item);
    navigation.navigate('ItemDetailScreen', { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventory</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <MaterialIcons name="notifications" size={32} color="white" />
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items added yet. Add some items to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemCategory}>Category: {item.category}</Text>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => handleDetails(item)} style={styles.actionButton}>
                    <MaterialCommunityIcons name="information-outline" size={24} color="#6200EE" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                    <MaterialIcons name="edit" size={24} color="#03DAC5" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                    <MaterialIcons name="delete" size={24} color="#B00020" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
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
    backgroundColor: '#4682b4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageWrapper: {
    height: 150,
    width: 150,
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
  },
  itemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemCategory: {
    fontSize: 14,
    color: '#555',
  },
  itemActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    marginHorizontal: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
