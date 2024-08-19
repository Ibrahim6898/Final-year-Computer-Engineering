import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { InventoryContext } from "../Context/InventoryContext";

export default function AlertSettingsScreen({ navigation }) {
  const { alertSettings, setAlertSettings } = useContext(InventoryContext);

  const handleSwitchChange = (name) => {
    setAlertSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleThresholdChange = (text) => {
    setAlertSettings(prev => ({
      ...prev,
      lowStockThreshold: parseInt(text) || 0
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Settings</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Low Stock Alert</Text>
          <Switch
            value={alertSettings.lowStockAlert}
            onValueChange={() => handleSwitchChange('lowStockAlert')}
          />
        </View>
        {alertSettings.lowStockAlert && (
          <View style={styles.setting}>
            <Text style={styles.settingText}>Low Stock Threshold</Text>
            <TextInput
              style={styles.input}
              value={alertSettings.lowStockThreshold.toString()}
              onChangeText={handleThresholdChange}
              placeholder="Enter threshold"
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.setting}>
          <Text style={styles.settingText}>Restock Reminder</Text>
          <Switch
            value={alertSettings.restockReminder}
            onValueChange={() => handleSwitchChange('restockReminder')}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>General Notification</Text>
          <Switch
            value={alertSettings.generalNotification}
            onValueChange={() => handleSwitchChange('generalNotification')}
          />
        </View>
      </View>
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
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 1,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "white",
    width: 100,
    textAlign: "center",
  },
});
