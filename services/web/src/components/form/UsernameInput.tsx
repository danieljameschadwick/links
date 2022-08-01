import React from "react";
import { StyleSheet, Text } from "react-native-web";
import { TextInput } from "@src/components/form/TextInput";

interface Props {
  showHelpText?: boolean;
  onChange: (event) => void;
  onSubmitEditing?: () => void;
  defaultValue?: string;
  disabled?: boolean;
}

export const UsernameInput: React.FC<Props> = (
  {
    onChange,
    onSubmitEditing = null,
    showHelpText = false,
    defaultValue = null,
    disabled = false,
  }
) => {
  const helpText = showHelpText
    ? "This is what people will use to find your page, and cannot be changed later."
    : null
  ;

  return (
    <TextInput
      textContentType={"username"}
      label={
        <Text style={styles.labelText}>
          links.gg/
        </Text>
      }
      placeholder={"Username"}
      autoComplete={"username"}
      defaultValue={defaultValue}
      helpText={helpText}
      onChange={onChange}
      onSubmitEditing={onSubmitEditing}
      disabled
    />
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: "rgb(255,113,0)",
    fontWeight: 800,
  },
});
