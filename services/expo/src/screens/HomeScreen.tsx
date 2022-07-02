import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenLink } from "../components/link/ScreenLink";
import { RootStackParamList } from "../typing/typing";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // @TODO: add typing from @types/links
  const [ profiles, setProfiles ] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // @TODO: replace with env var
      const response = await fetch(`http://localhost:4000/users`);
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
    <>
      <View style={[ styles.container ]}>
        <ScreenLink
          text={`Login`}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={[ styles.container ]}>
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
    </>
  );
};
