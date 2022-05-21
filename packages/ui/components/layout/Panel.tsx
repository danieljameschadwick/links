import React from "react";
import { StyleSheet, StyleProp, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 46,
  }
})

type Props = {
  style?: StyleProp<ViewStyle>;
  dataSet?: Record<string, string>;
  children: React.ReactNode;
}

export const Panel: React.FC<Props> = ({ style = undefined, dataSet = undefined, children }) => {
  return (
    <View style={[ styles.container, style]} dataSet={dataSet}>
      { children }
    </View>
  );
};
