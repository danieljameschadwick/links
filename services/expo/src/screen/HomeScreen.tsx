import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      paddingBottom: insets.bottom
    },
  });

  return (
    <View style={[ styles.container ]}>
      <TouchableOpacity onPress={() => navigation.navigate('Links')}>
        <Text>
          Daniel Chadwick's Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
