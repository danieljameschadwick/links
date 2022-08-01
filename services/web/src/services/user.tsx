import { HttpMethod } from "@src/util/http/httpFetch";

export const refreshTokens = async (accessToken: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URI}/authenticate/refresh`, {
    method: HttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });
};

export const fetchUserByToken = async (accessToken: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URI}/authenticate/user`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });
};
