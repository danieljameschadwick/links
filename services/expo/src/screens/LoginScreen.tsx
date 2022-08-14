import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getUser, getUserGracefully, postLogin } from "@links/http/services/user";
import { setTokens, setStoreUser } from "../app/reducer/UserReducer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_URL } from "@env";

interface Props {
  navigation: any; // @TODO: investigate type
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [ form, setForm ] = useState<{ email: string, password: string }>({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const onSubmit = async () => {
    console.log('onSubmit');

    const { email, password } = form;

    try {
      const tokens = await postLogin(API_URL, email, password);

      if (!tokens.accessToken) {
        // throw Error('Access token broken');
        console.log("Access token broken");

        return;
      }

      const user = await getUserGracefully(API_URL, tokens.accessToken);

      if (!user) {
        // throw Error('User not found');
        console.log('user not found');

        return;
      }

      console.log('setting to store');

      dispatch(setTokens(tokens)); // set our tokens
      dispatch(setStoreUser(user)); // use those tokens, from state
      navigation.navigate("Index");

      return;
    } catch (error) {
      console.log(error);
    }
  };

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
        <Text>
          Email / Username
        </Text>

        <TextInput
          placeholder={"Email / Username"}
          autoCapitalize={"none"}
          autoCompleteType={"username"}
          textContentType={"username"}
          onChange={(event) => setForm({
            ...form,
            email: event.nativeEvent.text,
          })}
          defaultValue={email}
          onSubmitEditing={onSubmit}
        />

        <Text>
          Password
        </Text>

        <TextInput
          secureTextEntry
          autoCapitalize={"none"}
          autoCompleteType={"password"}
          placeholder={"Password"}
          textContentType={"password"}
          onChange={(event) => setForm({
            ...form,
            password: event.nativeEvent.text,
          })}
          defaultValue={password}
          onSubmitEditing={onSubmit}
        />

        <Button
          title={"Login"}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};
