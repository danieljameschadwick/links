import React, { useState } from "react";
import { Text, Button, View } from "react-native-web";
import StyleSheet from "react-native-media-query";
import { Panel } from "@src/components/layout/Panel";
import { TextInput } from "@src/components/form/textInput/TextInput";

const { ids, styles } = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "667px",
    textAlign: "center",
    "@media (max-width: 667px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
      width: "100%",
    }
  },
  heading: { // h2
    fontSize: 22,
    marginBottom: 15,
  },
  headingAccent: {
    fontSize: 22,
    color: "rgb(255,113,0)",
    fontWeight: "bold",
  },
});

export const FeaturedPagesPanel: React.FC = () => {
  return (
    <Panel style={styles.container} dataSet={{ media: ids.container }}>
      <Text style={styles.heading}>
        Checkout our <Text style={styles.headingAccent}>favourite</Text> landing pages
      </Text>

      <View>

      </View>
    </Panel>
  );
};
