import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenLink } from "../components/link/ScreenLink";

interface Props {
  navigation: any; // @TODO: investigate type
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
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
      <ScreenLink
        text={"Daniel Chadwick's Profile"}
        onPress={() => navigation.navigate("Links", {
          username: "dan",
        })}
      />
    </View>
  );
};
