import { UserProfileInterface } from "@src/interfaces/UserProfileInterface";

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  name: string;
  userProfile: UserProfileInterface;
}
