import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "@src/components/layout/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { PageContent } from "@src/components/layout/PageContent";
import { useAppDispatch, useAppSelector } from "@src/app/hooks";
import { selectStoreUser, selectTokens, setTokens } from "@src/app/reducer/UserReducer";
import { useRouter } from "next/router";
import { fetchUserByToken, refreshTokens } from "@src/services/user";
import { UserInterface } from "@src/interfaces/UserInterface";
import { TextInput } from "@src/components/form/TextInput";

const Settings: React.FC = () => {
  const router = useRouter();
  const storeUser = useAppSelector(selectStoreUser);
  const tokens = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();
  const [ user, setUser ] = useState<UserInterface | null>(null);

  useEffect(() => {
    if (storeUser) {
      return;
    }

    router.push('/login');
  }, [storeUser]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetchUserByToken(tokens.accessToken);

      if (userResponse.status === 401) {
        // resync and set tokens
        const refreshedTokenResponse = await refreshTokens(tokens.refreshToken);

        if (refreshedTokenResponse.status !== 200) {
          return;
        }

        dispatch(setTokens(await refreshedTokenResponse.json())); // set our refreshed tokens

        return;
      }

      if (userResponse.status !== 200) {
        throw new Error('error with fetching data'); // @TODO: resolve error handling
      }

      setUser(await userResponse.json());
    }

    fetchData();
  }, [storeUser])

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Profile
        </Heading>

        <form>
          <TextInput
            label={"Name"}
            textContentType={"name"}
            autoComplete={"name"}
            placeholder={"Name"}
            onChange={(event) => console.log(event)}
            defaultValue={user.name}
            disabled
          />

          <TextInput
            label={"Username"}
            textContentType={"username"}
            autoComplete={"username"}
            placeholder={"Username"}
            onChange={(event) => console.log(event)}
            defaultValue={user.username}
            disabled
          />

          <TextInput
            label={"Email Address"}
            textContentType={"emailAddress"}
            autoComplete={"email"}
            placeholder={"Email Address"}
            onChange={(event) => console.log(event)}
            defaultValue={user.email}
            disabled
          />

          <TextInput
            secureTextEntry
            label={"Password"}
            textContentType={"password"}
            autoComplete={"password"}
            placeholder={"Password"}
            onChange={(event) => console.log(event)}
            defaultValue={"password"} // no reason to send the actual password
            disabled
          />
        </form>
      </PageContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Settings;