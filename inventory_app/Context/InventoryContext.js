import React, { createContext, useState, useEffect } from 'react';
import { getAllItems, deleteItemById, updateItemById } from '../firebase/inventory_service'; // Import Firebase functions

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [alertSettings, setAlertSettings] = useState({
    lowStockAlert: false,
    lowStockThreshold: 0,
  });

  useEffect(() => {
    // Fetch items from Firebase when the component mounts
    const fetchItems = async () => {
      try {
        const fetchedItems = await getAllItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items from Firebase:", error);
      }
    };

    fetchItems();
  }, []);

  const addItem = (item) => {
    setItems([...items, item]);
    checkLowStockAlert(item);
    sendNotification(
      `Item Added: ${item.name}`,
      `Item "${item.name}" was added to the inventory.`,
      'add-circle'
    );
  };

  const deleteItem = async (id) => {
    try {
      await deleteItemById(id); // Delete from Firebase
      const itemToDelete = items.find((item) => item.id === id);
      setItems(items.filter((item) => item.id !== id));
      sendNotification(
        'Item Deleted',
        `Item "${itemToDelete.name}" was deleted from the inventory.`,
        'delete'
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      await updateItemById(updatedItem.id, updatedItem); // Update in Firebase
      setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
      checkLowStockAlert(updatedItem);
      sendNotification(
        'Item Updated',
        `Item "${updatedItem.name}" was updated.`,
        'update'
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    const itemToUpdate = items.find(item => item.id === id);
    if (itemToUpdate) {
      const updatedItem = { ...itemToUpdate, quantity };
      await updateItem(updatedItem);
    }
  };

  const checkLowStockAlert = (item) => {
    if (alertSettings.lowStockAlert && item.quantity <= alertSettings.lowStockThreshold) {
      sendNotification(
        'Low Stock Alert',
        `Item "${item.name}" is low in stock.`,
        'warning'
      );
    }
  };

  const sendNotification = (title, message, icon) => {
    setNotifications([...notifications, { id: Date.now(), title, message, icon }]);
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, deleteItem, updateItem, updateItemQuantity, notifications, alertSettings, setAlertSettings }}>
      {children}
    </InventoryContext.Provider>
  );
};
