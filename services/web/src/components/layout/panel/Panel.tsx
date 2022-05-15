import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  dataSet?: Record<string, string>;
  children: React.ReactNode;
}

export const Panel: React.FC<Props> = ({ style = undefined, dataSet = undefined, children }) => {
  return (
    <View style={style} dataSet={dataSet}>
      { children }
    </View>
  );
};
