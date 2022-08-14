import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "@links/ui/components/form/TextInput";
import { RootStackParamList } from "../typing/typing";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectStoreUser, selectTokens, setStoreUser, setTokens } from "../app/reducer/UserReducer";
import { UserInterface } from "../interfaces/UserInterface";
import { getUser, refreshTokens } from "@links/http/services/user";
import { API_URL } from "@env";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const storeUser = useAppSelector(selectStoreUser);
  const [ user, setUser ] = useState<UserInterface | null>(null);

  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingTop: 15,
      paddingBottom: insets.bottom,
      paddingLeft: 10,
      paddingRight: 10,
    },
    linksContainer: {
      marginBottom: 25,
    },
    heading: {
      textAlign: "center",
      fontSize: 18,
      marginBottom: 15,
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!tokens) {
        console.log('no tokens to fetch data');

        dispatch(setStoreUser(null));
        navigation.navigate("Index");

        return;
      }

      const userResponse = await getUser(API_URL, tokens.accessToken);

      if (userResponse.status === 401) {
        // resync and set tokens
        const refreshedTokenResponse = await refreshTokens(API_URL, tokens.refreshToken);

        if (refreshedTokenResponse.status !== 200) {
          console.log('refreshedTokenResponse.status !== 200');

          dispatch(setStoreUser(null));
          dispatch(setTokens(null));
          navigation.navigate("Index");
  
          return;
        }

        dispatch(setTokens(await refreshedTokenResponse.json())); // set our refreshed tokens
        navigation.navigate("Index");

        return;
      }

      if (userResponse.status !== 200) {
        throw new Error('error with fetching data'); // @TODO: resolve error handling
      }

      setUser(await userResponse.json());
    }

    fetchData();
  }, [storeUser]);

  if (!storeUser) {
    navigation.navigate("Index");

    return;
  }

  if (!user) {
    return (
      // @TODO: screen loading animation
      <Text>Loading..</Text>
    );
  }

  const { name } = user;

  return (
    <View style={[ styles.container ]}>
      <TextInput
        label={"Name"}
        textContentType={"name"}
        autoComplete={"name"}
        placeholder={"Name"}
        onChange={(event) => {}}
        defaultValue={name}
        disabled
      />
    </View>
  );
};
