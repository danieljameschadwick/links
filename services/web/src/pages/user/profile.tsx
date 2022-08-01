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

const Profile: React.FC = () => {
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
        const refreshedTokenResponse = await refreshTokens(tokens.accessToken);

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

        <Text>
          {user.name}
        </Text>

        <Text>
          {user.email}
        </Text>
      </PageContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Profile;
