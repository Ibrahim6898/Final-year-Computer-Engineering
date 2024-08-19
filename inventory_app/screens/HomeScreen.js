import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const featuredProducts = [
    {
      id: 1,
      name: "Product 1",
      price: "₦10",
      image: require("../assets/product1.jpg"),
      description: "Description 1",
      quantity: 10,
    },
    {
      id: 2,
      name: "Product 2",
      price: "₦20",
      image: require("../assets/product2.jpg"),
      description: "Description 2",
      quantity: 20,
    },
    {
      id: 3,
      name: "Product 3",
      price: "₦30",
      image: require("../assets/product3.jpg"),
      description: "Description 3",
      quantity: 30,
    },
    // Add more products here
  ];

  const promotions = [
    {
      id: 1,
      title: "Free Consultation for Inventory Optimization",
      description:
        "Book a free consultation with our inventory experts to optimize your stock management and improve your business operations.",
      image: require("../assets/consultation_offer.jpg"),
    },
  ];

  const updateItem = (updatedItem) => {
    console.log("Item updated:", updatedItem);
  };

  const quickActions = [
    {
      icon: "add-box",
      label: "Add Item",
      action: () => navigation.navigate("AddItem"),
    },
    {
      icon: "update",
      label: "Update Stock",
      action: () => navigation.navigate("Inventory"), // Navigate to InventoryScreen
    },
    {
      icon: "report",
      label: "View Reports",
      action: () => navigation.navigate("Report"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFEFEF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <MaterialIcons name="notifications" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search here"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Featured Products Section */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productList}
          />
        </View>

        {/* Quick Actions Section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickAction}
                onPress={action.action}
              >
                <MaterialIcons name={action.icon} size={32} color="white" />
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotions Section */}
        <Text style={styles.sectionTitle}>Current Promotion</Text>

        <View style={styles.promotionsContainer}>
          <FlatList
            data={promotions}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.promotionCard}>
                <Image source={item.image} style={styles.promotionImage} />
                <Text style={styles.promotionTitle}>{item.title}</Text>
                <Text style={styles.promotionDescription}>
                  {item.description}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.promotionList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
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
    color: "white",
    fontWeight: "bold",
  },
  scrollViewContainer: {
    paddingHorizontal: 0, // Removed horizontal padding
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  featuredContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  productList: {
    justifyContent: "space-between",
  },
  productCard: {
    width: 120,
    marginHorizontal: 5,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around", // Adjusted to space out actions evenly
  },
  quickAction: {
    alignItems: "center",
    backgroundColor: "#03DAC6", // Appealing color for the quick action button
    padding: 10,
    borderRadius: 5,
    width: "30%", // Fixed width for equal sizes
  },
  quickActionLabel: {
    marginTop: 5,
    color: "white",
  },
  promotionsContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
    alignItems: "center",

  },
  promotionCard: {
    width: 300,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    alignItems: "center",
    padding: 10,
  },
  promotionImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  promotionList: {
    justifyContent: "space-between",
  },
});
