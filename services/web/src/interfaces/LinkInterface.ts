import { StyleSheet } from "react-native";

export interface LinkInterface {
  id: number;
  text: string;
  url: string;
  styles: StyleSheet.NamedStyles;
  logo?: {
    url: string;
    altText: string;
  };
}
