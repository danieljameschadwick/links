import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
});

const Index: React.FC = () => {
  return (
    <View>
      <Text style={styles.text}>
        Hello, World!
      </Text>

      <button type="button">
        Error
      </button>
    </View>
  );
};

export default Index;
