import React from "react";
import { StyleSheet, Text } from "react-native-web";
import { TextInput } from "@src/components/form/TextInput";

type Props = {
  showHelpText?: boolean;
  onChange: (event: any) => void; // @TODO: figure out what type the native event is
  onSubmitEditing: () => void;
  defaultValue?: string;
};

export const UsernameInput: React.FC<Props> = (
  {
    onChange,
    onSubmitEditing,
    showHelpText = false,
    defaultValue = null,
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
      defaultValue={defaultValue}
      helpText={helpText}
      onChange={onChange}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: "rgb(255,113,0)",
    fontWeight: 800,
  },
});
