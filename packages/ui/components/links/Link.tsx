import React from "react";
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle
} from "react-native";
import { Platforms } from "@links/ui/util/enum/Platforms";
import ExternalLink from "@links/ui/components/links/ExternalLink";

type LinkLogo = {
  url: string;
  altText: string;
};

type Props = {
  text: string;
  url: string;
  styles?: StyleProp<ViewStyle>;
  logo?: LinkLogo;
};

const Link: React.FC<Props> = ({ text, url, styles: propStyles = null, logo = null }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
      borderRadius: 5,
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

  const logoStyles = StyleSheet.create({
    text: {
      paddingRight: 25,
    },
  });

  const containerStyles = [ styles.container ];
  const textStyles = logo ? [styles.text, logoStyles.text] : [ styles.text ];

  if (propStyles) {
    if (propStyles.container) containerStyles.push(propStyles.container);
    if (propStyles.text) textStyles.push(propStyles.text);
  }

  const handlePress = () => {
    Linking.openURL(url);
  };

  // The purpose of TouchableWithoutFeedback is just to stop propagating
  // press events to parents
  // The View in the middle exists because otherwise TouchableWithoutFeedback
  // would render the inner link unclickable.
  if (Platform.OS === Platforms.WEB) {
    return (
      <TouchableWithoutFeedback>
        <View style={containerStyles}>
          <ExternalLink style={styles.link} url={url}>
            { logo && (
              <Image
                style={styles.logo}
                accessibilityLabel={logo.altText}
                source={{
                  uri: logo.url,
                }}
              />
            )}

            <Text style={textStyles}>{text}</Text>
          </ExternalLink>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback accessibilityRole={"link"} onPress={() => handlePress()}>
      <View style={containerStyles}>
        <Text style={textStyles}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Link;
