import { LinkInterface } from "@src/interfaces/LinkInterface";

export interface ProfileInterface {
  username: string;
  heading: string;
  subHeading?: string;
  links: LinkInterface[];
}
