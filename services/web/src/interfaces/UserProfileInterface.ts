import { LinkInterface } from "@src/interfaces/LinkInterface";

export interface UserProfileInterface {
  username: string;
  heading: string;
  subHeading?: string;
  styles: StyleSheet.NamedStyles;
  links: LinkInterface[];
}
