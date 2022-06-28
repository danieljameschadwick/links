import React from "react";
import { StyleSheet, Alert, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Link from "@links/ui/components/links/Link";

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    },
    headingContainer: {
      flex: 1,
      alignItems: "center",
      marginBottom: 10,
    },
    linksContainer: {
      flex: 1,
      flexDirection: "column",
    },
    debug: {
      borderColor: "red",
      borderWidth: 1,
    },
  });

  const linkStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      maxHeight: 35,
    },
    text: {
      color: "white",
    },
  });

  const handlePress = () => {
    Alert.alert("Test alert");
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.headingContainer, styles.debug]}>
        <Text>
          Daniel Chadwick
        </Text>

        <Text>
          Developer
        </Text>
      </View>

      <View style={[styles.linksContainer]}>
        <Link
          text={"www.danielchadwick.co.uk"}
          url={"http://www.danielchadwick.co.uk"}
          styles={linkStyles}
        />

        <Link
          text={"GitHub"}
          url={"http://www.github.com/danieljameschadwick"}
          styles={linkStyles}
        />
      </View>
    </View>
  );
};
