import React from "react";
import StyleSheet from "react-native-media-query";
import { View } from "react-native-web";

const { ids, styles } = StyleSheet.create({
  container: {
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 667px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
      width: "100%",
    }
  }
})

type Props = {
  children: React.ReactNode;
}

export const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      { children }
    </View>
  );
};
