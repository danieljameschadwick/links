import { UserInterface } from "@links/types/interfaces/UserInterface";

export const fetchUser = async (username: string): Promise<UserInterface | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/${username}`);

  if (response.status !== 200) {
    throw new Error('Profile not found.');
  }

  return await response.json();
};
