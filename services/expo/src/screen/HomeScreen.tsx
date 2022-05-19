import React from "react";
import { StyleSheet, Alert, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Link from "@links/ui/components/links/Link";

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    },
  });

  const handlePress = () => {
    Alert.alert("Test alert");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text>Test alert</Text>
      </TouchableOpacity>

      <View>
        <Link
          text={"www.danielchadwick.co.uk"}
          url={"http://www.danielchadwick.co.uk"}
        />
      </View>
    </View>
  );
};
