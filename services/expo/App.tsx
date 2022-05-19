import React from "react";
import { enableScreens } from "react-native-screens";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Alert, TouchableOpacity, Text, View } from "react-native";
import { HomeScreen } from "./src/screen/HomeScreen";

enableScreens(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const App: React.FC = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar />

      <HomeScreen />
    </SafeAreaProvider>
  );
};

export default App;
