import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import Link from "@links/ui/components/links/Link";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.tsx to start working on your app!
      </Text>

      {/* @TODO: fix shared packages */}
      {/*<Link*/}
      {/*  text={"www.danielchadwick.co.uk"}*/}
      {/*  url={"www.danielchadwick.co.uk"}*/}
      {/*/>*/}

      <StatusBar style="auto" />
    </View>
  );
};

export default App;
