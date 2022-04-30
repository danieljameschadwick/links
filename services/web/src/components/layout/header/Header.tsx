import { View, Text } from "react-native";

export const Header = () => {
  return (
    <View>
      <Text>links</Text>

      <View>
        <Text onPress={() => window.open("/login", "_self")}>
          Login
        </Text>

        <Text onPress={() => window.open("/register", "_self")}>
          Login
        </Text>
      </View>
    </View>
  );
};
