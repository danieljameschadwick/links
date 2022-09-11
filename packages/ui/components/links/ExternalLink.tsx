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
  disabled: boolean;
  children: React.ReactNode;
}

const ExternalLink: React.FC<Props> = ({
  style = undefined,
  url,
  children,
  openInANewTab = true,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;

    return openInANewTab ? Linking.openURL(url) : window.open(url, "_self");
  };

  return (
    <TouchableOpacity accessibilityRole={"link"} onPress={handleClick}>
      <View style={style}>{children}</View>
    </TouchableOpacity>
  );
};

export default ExternalLink;
