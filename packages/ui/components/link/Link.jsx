import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const Link = ({ text, url, styles: propStyles = null, logo = null }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
      borderRadius: 5,
    },
    link: {
      display: "flex",
      padding: 16,
    },
    logo: {
      width: 25,
      height: 25,
    },
    text: {
      flex: 1,
      textAlign: "center",
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      paddingRight: 0,
    },
  });

  const logoStyles = StyleSheet.create({
    text: {
      paddingRight: 25,
    },
  });

  const containerStyles = [ styles.container ];
  const textStyles = logo ? [styles.text, logoStyles.text] : [ styles.text ];

  if (propStyles) {
    if (propStyles.container) containerStyles.push(propStyles.container);
    if (propStyles.text) textStyles.push(propStyles.text);
  }

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={() => handlePress()}>
      <Text accessibilityRole={"link"} style={styles.text}>
        Link: {text}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Link;
