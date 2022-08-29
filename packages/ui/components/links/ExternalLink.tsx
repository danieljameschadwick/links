import React from "react";
import {
  Linking,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  url: string;
  style?: StyleProp<ViewStyle>;
  openInANewTab?: boolean;
  children: React.ReactNode;
}

const ExternalLink: React.FC<Props> = ({
  style = undefined,
  url,
  children,
  openInANewTab = true,
}) => {
  const handleClick = () =>
    openInANewTab ? Linking.openURL(url) : window.open(url, "_self");
  return (
    <TouchableOpacity
      accessibilityRole={"link"}
      onPress={handleClick}
    >
      <View style={style}>{children}</View>
    </TouchableOpacity>
  );
};

export default ExternalLink;
