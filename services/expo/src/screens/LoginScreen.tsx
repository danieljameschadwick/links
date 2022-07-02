import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "@links/ui/components/form/TextInput";

interface Props {
  navigation: any; // @TODO: investigate type
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [ form, setForm ] = useState<any>({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const onSubmit = () => {
    // @TODO: handle onSubmit
  }

  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: 10,
      paddingRight: 10,
    },
  });

  return (
    <View style={[ styles.container ]}>
      <Text>Login</Text>

      <View>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          onChange={(event) => setForm({
            ...form,
            email: event.nativeEvent.text,
          })}
          defaultValue={email}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
};
