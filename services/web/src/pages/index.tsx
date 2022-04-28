import React from "react";
import { View, Text } from "react-native";

const Index: React.FC = () => {
  return (
    <View>
      <Text>
        Links index.
      </Text>

      <Text onPress={() => window.open("/register", "_self")}>
        Register
      </Text>
    </View>
  );
};

export default Index;
