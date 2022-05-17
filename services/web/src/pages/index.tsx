import React from "react";
import { StyleSheet, View } from "react-native-web";
import NoSsrWrapper from "@src/components/noSsrWrapper";
import { Header } from "@src/components/layout/Header";
import { GetStartedPanel } from "@src/components/homepage/panel/GetStartedPanel";
import { UseAnywherePanel } from "@src/components/homepage/panel/UseAnywherePanel";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
});

const Index: React.FC = () => {
  // @TODO: PoC for theming, doesn't scale as requires 2x styling
  // const colorScheme = useColorScheme();
  // const container = colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;

  // @TODO: potential idea, move styles to inside component and use a provider:
  // const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  // const styles = StyleSheet.create({
  //   container: {
  //     color: `${theme.color.primary}`,
  //   },
  // });

  return (
    <NoSsrWrapper> {/* used when styles change due to styling */}
      <View style={styles.container}>
        <Header />

        <GetStartedPanel />

        <UseAnywherePanel />
      </View>
    </NoSsrWrapper>
  );
};

export default Index;
