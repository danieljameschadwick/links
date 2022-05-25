import React from "react";
import { StyleSheet, View } from "react-native-web";
import { Transition, TransitionGroup } from "react-transition-group";
import NoSsrWrapper from "@src/components/noSsrWrapper";
import { Header } from "@src/components/layout/Header";
import { play, exit } from "@src/animations/timelines";
import { GetStartedPanel } from "@src/components/homepage/panel/GetStartedPanel";
import { UseAnywherePanel } from "@src/components/homepage/panel/UseAnywherePanel";
import { PrivacyPanel } from "@src/components/homepage/panel/PrivacyPanel";

const styles = StyleSheet.create({
  container: {
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

  const panels = [
    <GetStartedPanel />,
    <UseAnywherePanel />,
    <PrivacyPanel />
  ];

  return (
    <NoSsrWrapper> {/* used when styles change due to styling */}
      <View style={styles.container}>
        <Header />

        <View style={styles.contentContainer}>
          <TransitionGroup component={null}>
            { panels.map((component, index) =>
              <Transition
                key={index}
                appear={true}
                onEnter={(node, appears) => play("panelLoader", node, appears, index)}
                onExit={(node) => exit(node)}
                timeout={{ enter: 750, exit: 150 }}
              >
                { component }
              </Transition>
            ) }
          </TransitionGroup>
        </View>
      </View>
    </NoSsrWrapper>
  );
};

export default Index;
