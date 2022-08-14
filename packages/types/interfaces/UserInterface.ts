import { UserProfileInterface } from "./UserProfileInterface";

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  name: string;
  userProfile: UserProfileInterface;
}
