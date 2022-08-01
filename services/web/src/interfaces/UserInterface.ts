import { UserProfileInterface } from "@src/interfaces/UserProfileInterface";

export interface UserInterface {
  id: number;
  username: string;
  name: string;
  userProfile: UserProfileInterface;
}
