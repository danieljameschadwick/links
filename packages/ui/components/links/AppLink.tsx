import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  ViewStyle
} from "react-native";

type LinkLogo = {
  url: string;
  altText: string;
};

type Props = {
  text: string;
  url: string;
  containerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<ViewStyle>;
  logo?: LinkLogo;
};

const AppLink: React.FC<Props> = ({ text, url, containerStyle, textStyle, logo = null }) => {
  const linkHeight = 50;
  const linkStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: linkHeight,
    },
    logo: {
      width: 25,
      height: 25,
      position: "absolute",
      left: 10,
    },
    text: {
      lineHeight: linkHeight,
      paddingRight: 0,
    },
  });

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableWithoutFeedback accessibilityRole={"link"} onPress={() => handlePress()}>
      <View style={[ containerStyle, linkStyle.container ]}>
        { logo && (
          <Image
            style={[ linkStyle.logo ]}
            accessibilityRole={"image"}
            accessibilityLabel={logo.altText}
            source={{
              uri: logo.url,
            }}
          />
        )}

        <Text style={[ textStyle, linkStyle.text ]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppLink;
