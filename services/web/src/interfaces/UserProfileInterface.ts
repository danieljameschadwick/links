import { LinkInterface } from "@src/interfaces/LinkInterface";
import { StyleProp, ViewStyle } from "react-native";

export interface UserProfileInterface {
  username: string;
  heading: string;
  subHeading?: string;
  styles: StyleProp<ViewStyle>;
  links: LinkInterface[];
}
