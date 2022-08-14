import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "next/router";
import { postLogin, getUserGracefully } from "@links/http/services/user";
import { Header } from "@src/components/layout/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { Button } from "@src/components/form/Button";
import { PageContent } from "@src/components/layout/PageContent";
import { TextInput } from "@src/components/form/TextInput";
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

    const tokens = await postLogin(process.env.NEXT_PUBLIC_API_URI, email, password);

    if (!tokens.accessToken) {
      // throw Error('Access token broken');
      console.log("Access token broken");

      return;
    }

    const user = await getUserGracefully(process.env.NEXT_PUBLIC_API_URI, tokens.accessToken);

    if (!user) {
      // throw Error('User not found');
      console.log('user not found');

      return;
    }

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
            text={"Login"}
            buttonStyles={buttonStyles}
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

const buttonStyles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "rgb(255,113,0)",
    height: 40,
  },
});

export default Login;
