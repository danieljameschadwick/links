import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Platforms } from "@links/ui/util/enum/Platforms";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import AppLink from "./AppLink";

interface LinkLogo {
  url: string;
  altText: string;
}

interface Props {
  text: string;
  url: string;
  styles?: StyleProp<ViewStyle>;
  logo?: LinkLogo;
  disabled?: boolean;
}

const Link: React.FC<Props> = ({
  text,
  url,
  styles: propStyles = null,
  logo = null,
  disabled = false,
}) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
      borderRadius: 5,
    },
    link: {
      display: "flex",
      flexDirection: "row",
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

  const containerStyle = [styles.container];
  const textStyle = logo ? [styles.text, logoStyles.text] : [styles.text];

  if (propStyles) {
    if (propStyles.container) containerStyle.push(propStyles.container);
    if (propStyles.text) textStyle.push(propStyles.text);
  }

  // The purpose of TouchableWithoutFeedback is just to stop propagating
  // press events to parents
  // The View in the middle exists because otherwise TouchableWithoutFeedback
  // would render the inner link unclickable.
  if (Platform.OS === Platforms.WEB) {
    return (
      <TouchableWithoutFeedback>
        <View style={containerStyle}>
          <ExternalLink style={styles.link} url={url} disabled={disabled}>
            {logo && (
              <Image
                style={styles.logo}
                accessibilityLabel={logo.altText}
                source={{
                  uri: logo.url,
                }}
              />
            )}

            <Text style={textStyle}>{text}</Text>
          </ExternalLink>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <AppLink
      text={text}
      url={url}
      containerStyle={containerStyle}
      textStyle={textStyle}
      logo={logo}
    />
  );
};

export default Link;
