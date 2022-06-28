import React from "react";
import { StyleSheet, View, Text } from "react-native-web";
import Link from "@links/ui/components/links/Link";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "black",
  },
  contentContainer: {
    marginLeft: 15,
    marginRight: 15,
  }
});

const Test: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>

      <Link
        key={'1'}
        text={'test'}
        url={'test'}
      />
    </View>
  );
};

export default Test;
