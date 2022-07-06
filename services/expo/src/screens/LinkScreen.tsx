import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Link from "@links/ui/components/links/Link";
import { API_URL } from '@env';

// @TODO: move to typing package
interface User {
  username: string;
  userProfile?: {
    heading: string;
    subHeading?: string;
    styles: StyleProp<ViewStyle>;
    links: LinkInterface[],
  },
}

interface LinkInterface {
  id: number;
  text: string;
  url: string;
  styles: StyleProp<ViewStyle>;
  logo?: {
    url: string;
    altText: string;
  };
}

interface Props {
  route: any;
}

export const LinkScreen: React.FC<Props> = ({ route }) => {
  const [ user, setUser ] = useState<User | null>(null);
  const username = route.params?.username;

  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    headingContainer: {
      width: "100%",
      marginBottom: 5,
    },
    headingText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 2,
      textAlign: "center",
    },
    subHeadingText: {
      fontSize: 18,
      textAlign: "center",
    },
    linksContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      width: "100%",
      padding: 10,
    },
  });

  useEffect(() => {
    const fetchData = async (username) => {
      // @TODO: replace with env var
      const response = await fetch(`${API_URL}/users/${username}`);
      const data = await response.json();

      if (response.status !== 200) {
        return; // @TODO: error handling
      }

      setUser(data);
    }

    try {
      fetchData(username);
    } catch (error) {
      console.log('error');
    }
  }, [ username ]);

  if (!user) {
    return (
      <View style={[ styles.container ]}>
        <Text>Loading..</Text>
      </View>
    );
  }

  const { userProfile } = user;

  if (!userProfile) {
    return (
      <View style={[ styles.container ]}>
        <Text>Profile under construction.</Text>
      </View>
    );
  }

  const {
    heading,
    subHeading = null,
    styles: profileStyles,
    links = [],
  } = userProfile;

  return (
    <View style={[ styles.container, profileStyles.container ]}>
      <View style={[ styles.headingContainer ]}>
        <Text style={[ styles.headingText, profileStyles.headingText ]}>
          { heading }
        </Text>

        { subHeading && (
          <Text style={[ styles.subHeadingText, profileStyles.headingText ]}>
            { subHeading }
          </Text>
        )}
      </View>

      <View style={[ styles.linksContainer ]}>
        {links.map(({ id, text, url, styles, logo }) => {
          return (
            <Link
              key={id}
              text={text}
              url={url}
              styles={styles}
              logo={logo}
            />
          );
        })}
      </View>
    </View>
  );
};
