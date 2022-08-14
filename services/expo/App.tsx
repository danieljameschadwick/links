import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store, { persistor } from "@links/state/store";

import { HomeScreen } from "./src/screens/HomeScreen";
import { LinkScreen } from "./src/screens/LinkScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar />

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Index">
              <Stack.Screen name="Index" component={HomeScreen} options={{ title: "Home" }} />
              <Stack.Screen name="Links" component={LinkScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              {/* // @TODO: implement registration in app */}
              {/*<Stack.Screen name="Register" component={RegisterScreen} />*/}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
