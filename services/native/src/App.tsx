import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    backgroundColor: "red",
    height: 200,
  }
});

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.tsx to start working on your app!
      </Text>

      {/* @TODO: fix shared packages */}
      {/*<Link*/}
      {/*  text={"www.danielchadwick.co.uk"}*/}
      {/*  url={"www.danielchadwick.co.uk"}*/}
      {/*  styles={styles.link}*/}
      {/*/>*/}
    </View>
  );
};

export default App;
