import { StyleProp, ViewStyle } from "react-native";

export interface LinkInterface {
  id: number;
  text: string;
  url: string;
  styles: StyleProp<ViewStyle>;
  logo?: {
    url: string;
    altText: string;
  };
}
