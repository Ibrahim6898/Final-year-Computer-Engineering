import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { InventoryContext } from "../Context/InventoryContext";

export default function ReportsScreen() {
  const { items } = useContext(InventoryContext);

  // Calculate total inventory count and categorize by item type
  const totalInventory = items.reduce((sum, item) => sum + item.quantity, 0);

  const categorizedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Reports</Text>

      {/* Total Inventory Count */}
      <View style={styles.reportContainer}>
        <Text style={styles.reportTitle}>Total Inventory</Text>
        <Text style={styles.reportValue}>{totalInventory} items</Text>
      </View>

      {/* Categorized Items */}
      <FlatList
        data={Object.keys(categorizedItems)}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <View style={styles.reportContainer}>
            <Text style={styles.reportTitle}>{category}</Text>
            <FlatList
              data={categorizedItems[category]}
              keyExtractor={(item) =>
                item.id !== undefined
                  ? item.id.toString()
                  : `unknown-${Math.random()}`
              }
              renderItem={({ item }) => (
                <Text style={styles.reportItem}>
                  {item.name} - {item.quantity} units - ₦{item.price.toFixed(2)}
                </Text>
              )}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4682b4",
  },
  reportContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  reportValue: {
    fontSize: 16,
    color: "#555",
  },
  reportItem: {
    fontSize: 14,
    color: "#777",
    marginVertical: 2,
  },
  list: {
    paddingBottom: 16,
  },
});
