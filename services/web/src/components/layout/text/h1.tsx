import React from "react";
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  children: string;
  style?: StyleProp<ViewStyle>[];
}

export const Heading: React.FC<Props> = ({ children, style = [] }) => {
  return (
    <Text
      style={[ headerStyles.h1, ...style ]}
      accessibilityRole={"header"}
    >
      {children}
    </Text>
  )
};

export const headerStyles = StyleSheet.create({
  h1: {
    fontSize: 36,
    marginBottom: 20,
  },
  h2: {
    fontSize: 28,
    marginBottom: 15,
  },
  h3: {
    fontSize: 22,
    marginBottom: 15,
  },
  h4: {
    fontSize: 16,
    marginBottom: 15,
  },
  center: {
    textAlign: "center",
  }
});
