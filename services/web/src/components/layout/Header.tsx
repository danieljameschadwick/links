import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRouter } from "next/router";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import { useAppDispatch, useAppSelector } from "@links/state/hooks";
import { selectStoreUser, setStoreUser, setTokens } from "@links/state/reducer/UserReducer";

export const Header: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector(selectStoreUser);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setTokens(null));
    dispatch(setStoreUser(null));

    router.push('/');
    return;
  };

  return (
    <>
      <View style={styles.container}>
        <ExternalLink style={styles.logoText} url={"/"} openInANewTab={false}>
          links
        </ExternalLink>

        <View style={styles.linksContainer}>
          {user ? (
            <>
              <ExternalLink
                style={styles.link}
                url={"/user/settings"}
                openInANewTab={false}
              >
                {user.name}
              </ExternalLink>
              <Text
                accessibilityRole="link"
                style={styles.link}
                onPress={() => logout()}
              >
                Logout
              </Text>
            </>
          ) : (
            <>
              <Text
                accessibilityRole="link"
                style={styles.link}
                onPress={() => router.push("/login")}
              >
                Login
              </Text>

              <Text
                accessibilityRole="link"
                style={styles.link}
                onPress={() => router.push("/register")}
              >
                Register
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.fixedCoverContainer} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "fixed", // investigate fixed typehint, does work
    zIndex: 2, // add overlay constants to layout
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 50,
    padding: 12,
    backgroundColor: "rgb(255,255,255)",
    border: "1px solid rgb(215 220 224)",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  fixedCoverContainer: {
    height: 50,
    marginBottom: 25,
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
    padding: 6,
  }
});
