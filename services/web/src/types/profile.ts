import { LinkInterface } from "./link";

export interface ProfileInterface {
    username: string;
    heading: string;
    subHeading?: string;
    links: LinkInterface[];
}
