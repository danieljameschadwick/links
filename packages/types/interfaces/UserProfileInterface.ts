import { StyleProp, ViewStyle } from "react-native";
import { LinkInterface } from "./LinkInterface";

export interface UserProfileInterface {
  username: string;
  heading: string;
  subHeading?: string;
  styles: StyleProp<ViewStyle>;
  links: LinkInterface[];
}
