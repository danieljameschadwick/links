import React from "react";
import StyleSheet from "react-native-media-query";
import { View } from "react-native-web";

interface Props {
  children: React.ReactNode;
}

export const FluidPageContent: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      { children }
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 667px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
      width: "100%",
    },
  },
});
