import { ProfileInterface } from "@src/interfaces/ProfileInterface";

export const fetchProfile = async (username: string): Promise<ProfileInterface | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/${username}`);

  if (response.status !== 200) {
    throw new Error('Profile not found.');
  }

  return await response.json();
};
