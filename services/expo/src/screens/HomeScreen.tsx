import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenLink } from "../components/link/ScreenLink";
import { RootStackParamList } from "../typing/typing";
import { API_URL } from "@env";
import { useAppSelector } from "../app/hooks";
import { selectStoreUser } from "../app/reducer/UserReducer";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const storeUser = useAppSelector(selectStoreUser);
  // @TODO: add typing from @types/links
  const [ profiles, setProfiles ] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // @TODO: replace with env var
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (response.status !== 200) {
        return; // @TODO: error handling
      }

      setProfiles(data);
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

  return (
    <View style={[ styles.container ]}>
      <View style={[ styles.linksContainer ]}>
        { storeUser?.name ? (
          <ScreenLink
            text={`Settings`}
            onPress={() => navigation.navigate("Settings")}
          />
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
