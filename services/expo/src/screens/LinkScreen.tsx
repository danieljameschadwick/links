import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Link from "@links/ui/components/links/Link";

export const LinkScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    },
    headingContainer: {
      width: "100%",
      marginBottom: 5,
    },
    headingText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 2,
      textAlign: "center",
    },
    subHeadingText: {
      fontSize: 18,
      textAlign: "center",
    },
    linksContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
      padding: 10,
    },
  });

  const linkHeight = 50;
  const linkStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      maxHeight: linkHeight,
      backgroundColor: "black",
    },
    text: {
      color: "white",
      lineHeight: linkHeight,
    },
  });

  return (
    <View style={[ styles.container ]}>
      <View style={[ styles.headingContainer ]}>
        <Text style={[ styles.headingText ]}>
          Daniel Chadwick
        </Text>

        <Text style={[ styles.subHeadingText ]}>
          Developer
        </Text>
      </View>

      <View style={[ styles.linksContainer ]}>
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
