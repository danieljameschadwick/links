import React, { useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { Header } from "@src/components/layout/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { PageContent } from "@src/components/layout/PageContent";
import { TextInput } from "@src/components/form/TextInput";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  signUpContainer: {
    marginTop: 10,
  },
  link: {
    fontSize: 12,
    textAlign: "center",
  },
  linkUnderline: {
    textDecorationLine: "underline",
  }
});

const Login: React.FC = () => {
  const [ form, setForm ] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const handleSubmit = (): void => {
    // @TODO: handle login
    console.log(form);
  };

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Login
        </Heading>

        <form>
          <TextInput
            placeholder={"Email"}
            textContentType={"emailAddress"}
            onChange={(event) => setForm({
              ...form,
              email: event.nativeEvent.text,
            })}
            defaultValue={email}
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
            defaultValue={password}
            onSubmitEditing={handleSubmit}
          />

          <Button
            accessibilityLabel={"submit"}
            color={"rgb(255,113,0)"}
            title={"Login"}
            onPress={handleSubmit}
          />
        </form>

        <View style={styles.signUpContainer}>
          <Text
            accessibilityRole="link"
            style={styles.link}
            onPress={() => window.open("/register", "_self")}
          >
            Don't have an account? <Text style={styles.linkUnderline}>Create one here</Text>.
          </Text>
        </View>
      </PageContent>
    </View>
  );
};

export default Login;
