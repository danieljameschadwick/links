import React from "react";
import { Pressable, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
  accessibilityLabel: string;
  buttonStyles?: StyleProp<ViewStyle>[];
}

export const Button: React.FC<Props> = (
  {
    text,
    onPress,
    accessibilityLabel = "Submit",
    buttonStyles = undefined,
  }
) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={"button"}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(253,137,35)" : "rgb(255,113,0)",
        },
        styles.button,
        buttonStyles?.button,
      ]}
    >
      <Text style={[ styles.text, buttonStyles?.text ]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
