import ExternalLink from "@links/ui/components/links/ExternalLink";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "50px",
    padding: "12px",
  },
  logoText: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "rgb(255,113,0)",
  },
  linksContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  link: {
    padding: "6px",
  }
});

export const Header = () => {
  return (
    <View style={styles.container}>
      <ExternalLink style={styles.logoText} url={"/"} openInANewTab={false}>
        links
      </ExternalLink>

      <View style={styles.linksContainer}>
        <Text
          accessibilityRole="link"
          style={styles.link}
          onPress={() => window.open("/login", "_self")}
        >
          Login
        </Text>

        <Text
          accessibilityRole="link"
          style={styles.link}
          onPress={() => window.open("/register", "_self")}
        >
          Register
        </Text>
      </View>
    </View>
  );
};
