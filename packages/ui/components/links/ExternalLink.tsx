import React from "react";
import {
  Linking,
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
      style={style}
      accessibilityRole={"link"}
      onPress={handleClick}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default ExternalLink;
