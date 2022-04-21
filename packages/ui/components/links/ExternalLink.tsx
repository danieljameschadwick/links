import React from "react";
import { Text } from "react-native-web";

type Props = {
  style: React.CSSProperties;
  url: string;
  children: React.ReactNode;
};

const ExternalLink: React.FC<Props> = ({ style, url, children }) => {
  return (
    <Text style={style} accessibilityRole={"link"} onClick={() => window.open(url, '_blank')}>
      {children}
    </Text>
  );
};

export default ExternalLink;
