import React from "react";
import { Linking, StyleProp, ViewStyle } from "react-native";
import { Text } from "react-native-web";

type Props = {
  style: StyleProp<ViewStyle>;
  url: string;
  openInANewTab?: boolean;
  children: React.ReactNode;
};

const ExternalLink: React.FC<Props> = ({ style, url, children, openInANewTab = true }) => {
  const handleClick = () => openInANewTab
    ? Linking.openURL(url)
    : window.open(url, "_self")
  ;

  return (
    <Text style={style} accessibilityRole={"link"} onClick={handleClick}>
      {children}
    </Text>
  );
};

export default ExternalLink;
