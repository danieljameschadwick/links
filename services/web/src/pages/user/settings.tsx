import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getUser, refreshTokens } from "@links/http/services/user";
import { Header } from "@src/components/layout/header/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { PageContent } from "@src/components/layout/PageContent";
import { useAppDispatch, useAppSelector } from "@links/state/hooks";
import { selectStoreUser, selectTokens, setStoreUser, setTokens } from "@links/state/reducer/UserReducer";
import { useRouter } from "next/router";
import { UserInterface } from "@links/types/interfaces/UserInterface";
import { TextInput } from "@src/components/form/TextInput";
import { UsernameInput } from "@src/components/form/UsernameInput";

const Settings: React.FC = () => {
  const router = useRouter();
  const storeUser = useAppSelector(selectStoreUser);
  const tokens = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();
  const [ user, setUser ] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tokens) {
        router.push('/login');

        return;
      }

      const userResponse = await getUser(process.env.NEXT_PUBLIC_API_URI, tokens.accessToken);

      if (userResponse.status === 401) {
        // resync and set tokens
        const refreshedTokenResponse = await refreshTokens(process.env.NEXT_PUBLIC_API_URI, tokens.refreshToken);

        if (refreshedTokenResponse.status !== 200) {
          dispatch(setStoreUser(null)); // set our refreshed tokens
          dispatch(setTokens(null)); // set our refreshed tokens
          router.push('/login');

          return;
        }

        dispatch(setTokens(await refreshedTokenResponse.json())); // set our refreshed tokens
        router.reload();

        return;
      }

      if (userResponse.status !== 200) {
        throw new Error('error with fetching data'); // @TODO: resolve error handling
      }

      setUser(await userResponse.json());
    }

    fetchData();
  }, [storeUser]);

  if (!tokens) {
    router.push('/login');

    return null;
  }

  if (!user) {
    return null;
  }

  const handleModifyPassword = () => {
    console.log('// @TODO: handle modify password logic');
  }

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Settings
        </Heading>

        <form>
          <UsernameInput
            onChange={() => {}} // @TODO: fix inputs onChange to be optional
            defaultValue={user.username}
            disabled
          />

          <TextInput
            label={"Name"}
            textContentType={"name"}
            autoComplete={"name"}
            placeholder={"Name"}
            onChange={() => {}}
            defaultValue={user.name}
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
            buttonText={"Modify password"}
            handleButtonPress={handleModifyPassword}
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
