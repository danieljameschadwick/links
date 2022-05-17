import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { Header } from "@src/components/layout/Header";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

const Register: React.FC = () => {
  const [ form, setForm ] = useState({});

  const handleSubmit = (): void => {
    console.log(form);
  };

  return (
    <View style={styles.container}>
      <Header />

      <form>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          onChange={(event) => setForm({
            ...form,
            email: event.nativeEvent.text,
          })}
          onSubmitEditing={handleSubmit}
        />

        <TextInput
          secureTextEntry={true}
          placeholder={"Password"}
          textContentType={"password"}
          onChange={(event) => setForm({
            ...form,
            password: event.nativeEvent.text,
          })}
          onSubmitEditing={handleSubmit}
        />

        <Button title={"Register"} onPress={handleSubmit} />
      </form>
    </View>
  );
};

export default Register;