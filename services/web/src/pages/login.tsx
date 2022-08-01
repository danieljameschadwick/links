import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { useRouter } from "next/router";
import { Header } from "@src/components/layout/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { PageContent } from "@src/components/layout/PageContent";
import { TextInput } from "@src/components/form/TextInput";
import { HttpMethod } from "@src/util/http/httpFetch";
import { useAppDispatch, useAppSelector } from "@src/app/hooks";
import { selectStoreUser, setTokens, setStoreUser } from "@src/app/reducer/UserReducer";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectStoreUser);
  const [ form, setForm ] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleSubmit = async (): Promise<void> => {
    const { email, password } = form;
    const payload = {
      username: email,
      password,
    };

    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/authenticate/login`, {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const tokens = await loginResponse.json();

    if (!tokens.accessToken) {
      // throw Error('Access token broken');
      console.log("Access token broken");

      return;
    }

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/authenticate/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });
    const user = await userResponse.json();

    dispatch(setTokens(tokens)); // set our tokens
    dispatch(setStoreUser(user)); // use those tokens, from state
  };

  useEffect(() => {
    if (!storeUser) {
      return;
    }

    router.push('/user/settings');
  }, [storeUser]);

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Login
        </Heading>

        <form>
          <TextInput
            placeholder={"Email / Username"}
            autoComplete={"username"}
            textContentType={"username"}
            onChange={(event) => setForm({
              ...form,
              email: event.nativeEvent.text,
            })}
            defaultValue={email}
            onSubmitEditing={handleSubmit}
          />

          <TextInput
            secureTextEntry
            autoComplete={"password"}
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
            onPress={() => router.push("/register")}
          >
            Don't have an account? <Text style={styles.linkUnderline}>Create one here</Text>.
          </Text>
        </View>
      </PageContent>
    </View>
  );
};

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

export default Login;
