import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Link from "@links/ui/components/links/Link";
import { UserProfileInterface } from "@src/interfaces/UserProfileInterface";
import { EditPanel } from "@src/components/profile/EditPanel";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  heading: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
  },
  subHeading: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 16,
  },
  sidePanel: {
    position: "absolute",
    right: 0,
    height: "100%",
    backgroundColor: "white",
  },
});

const tempStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  link: {
    display: "flex",
    padding: 16,
  },
  logo: {
    width: 25,
    height: 25,
  },
  text: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    paddingRight: 0,
  },
});

type Props = {
  profile: UserProfileInterface;
};

const UserProfile: React.FC<Props> = ({ profile }) => {
  const {
    heading,
    subHeading = undefined,
    links = [],
  } = profile;

  const profileStyles = StyleSheet.create({
    container: {
      maxWidth: 500,
      marginTop: 24,
    }
  });

  return (
    <>
      <View style={profileStyles.container}>
        <Text accessibilityRole={"header"} style={styles.heading}>
          {heading}
        </Text>

        {subHeading && (
          <Text accessibilityRole={"text"} style={styles.subHeading}>
            {subHeading}
          </Text>
        )}

        <View>
          {links.map(({ id, text, url, styles, logo = null }) => {
            return (
              <Link key={id} text={text} url={url} styles={styles} logo={logo} />
            );
          })}
        </View>
      </View>

      {/*{ showSettings ? (*/}
      <View style={styles.sidePanel}>
        <EditPanel profile={profile} />
      </View>
      {/*) }*/}
    </>
  );
};

export default UserProfile;
