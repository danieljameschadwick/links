import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenLink } from "../components/link/ScreenLink";
import { RootStackParamList } from "../typing/typing";
import { useAppDispatch, useAppSelector } from "@links/state/hooks";
import { selectStoreUser, selectTokens, setStoreUser, setTokens } from "@links/state/reducer/UserReducer";
import { getUser, getUsers, refreshTokens } from "@links/http/services/user";
import { UserInterface } from "@links/types/interfaces/UserInterface";
import { API_URL } from "@env";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const storeUser = useAppSelector(selectStoreUser);
  const [ user, setUser ] = useState<UserInterface | null>(null);
  const [ profiles, setProfiles ] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!tokens) {
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

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(API_URL);

      setProfiles(users);
    };

    try {
      fetchData();
    } catch (error) {
      console.log("error");
    }
  }, []);

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

  const logout = () => {
    dispatch(setTokens(null));
    dispatch(setStoreUser(null));
    setUser(null);

    navigation.navigate("Index");
  };

  return (
    <View style={[ styles.container ]}>
      <View style={[ styles.linksContainer ]}>
        { user?.name ? (
          <>
            <ScreenLink
              text={`Your Profile`}
              onPress={() => navigation.navigate("Links", {
                username: user.username,
              })}
            />
            <ScreenLink
              text={`Settings`}
              onPress={() => navigation.navigate("Settings")}
            />
            <ScreenLink
              text={`Logout`}
              onPress={() => logout()}
            />
          </>
        ) : (
          <ScreenLink
            text={`Login`}
            onPress={() => navigation.navigate("Login")}
          />
        )}
      </View>

      <View>
        <Text style={[ styles.heading ]}>
          Links
        </Text>

        {profiles.map((({ name, username }, index) =>
          <ScreenLink
            key={index}
            text={`${name}'s Profile`}
            onPress={() => navigation.navigate("Links", {
              username,
            })}
          />
        ))}
      </View>
    </View>
  );
};
