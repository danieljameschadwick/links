import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  text: string;
  onPress: () => void;
}

export const ScreenLink: React.FC<Props> = ({ text, onPress }) => {
  const styles = StyleSheet.create({
    container: {
      height: 50,
      width: "100%",
      backgroundColor: "black",
      marginBottom: 10,
    },
    text: {
      color: "white",
      lineHeight: 50,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity accessibilityRole={"link"} style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        { text }
      </Text>
    </TouchableOpacity>
  );
}
