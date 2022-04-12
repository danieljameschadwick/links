import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProfileInterface } from "@src/interfaces/ProfileInterface";
import Link from "@links/ui/components/links/Link";

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
});

type Props = {
  profile: ProfileInterface;
};

const Profile: React.FC<Props> = ({ profile }) => {
  const {
    heading,
    subHeading = undefined,
    links = [],
  } = profile;

  const profileStyles = StyleSheet.create({
    container: {
      maxWidth: 500,
      marginTop: 24,
      // ...styles.container, // @TODO: add from API
    }
  });

  return (
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
  );
};

export default Profile;
