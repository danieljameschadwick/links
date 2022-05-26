import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { useRouter } from "next/router";
import { Header } from "@src/components/layout/Header";
import { PageContent } from "@src/components/layout/PageContent";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { TextInput } from "@src/components/form/TextInput";
import { UsernameInput } from "@src/components/form/UsernameInput";
import post from "@src/util/http/post";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

const Register: React.FC = () => {
  const {
    query: {
      username,
    },
  } = useRouter();
  const [ form, setForm ] = useState({
    username: username,
    email: "",
    password: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      username,
    });
  }, [ username ]);

  const handleSubmit = async () => {
    console.log(form);

    try {
      await post(`${process.env.NEXT_PUBLIC_API_URI}/users`, form);
    } catch (error) {
      console.log(error); // plug into error handling
    }

    // dispatch to user reducer, and authenticate
    // dispatch(USER.AUTHENTICATE, { form // userData })
  };

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Register
        </Heading>

        <Heading style={[ headerStyles.h3, headerStyles.center ]}>
          Create an account for free - forever!
        </Heading>

        <form>
          <UsernameInput
            onChange={(event) => setForm({
              ...form,
              username: event.nativeEvent.text,
            })}
            defaultValue={form.username}
            onSubmitEditing={handleSubmit}
            showHelpText={true}
          />

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

          <Button
            accessibilityLabel={"submit"}
            color={"rgb(255,113,0)"}
            title={"Register"}
            onPress={handleSubmit}
          />
        </form>
      </PageContent>
    </View>
  );
};

export default Register;
