import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "@links/ui/components/form/TextInput";
import { RootStackParamList } from "../typing/typing";
import { useAppSelector } from "../app/hooks";
import { selectStoreUser } from "../app/reducer/UserReducer";

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const storeUser = useAppSelector(selectStoreUser);
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

  if (!storeUser) {
    navigation.navigate("Index");

    return;
  }

  const { name } = storeUser;

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
