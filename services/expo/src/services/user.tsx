import axios, { AxiosResponse } from "axios";
import { TokensInterface } from "../interfaces/TokensInterface";
import { UserInterface } from "../interfaces/UserInterface";
import { API_URL } from '@env';

// @TODO: fetching/http common library
export const postLogin = async (username: string, password: string): Promise<TokensInterface> => {
  console.log(`${API_URL}/authenticate/login`);

  const response = await axios.post(`${API_URL}/authenticate/login`,
    JSON.stringify({
      username,
      password,
    }),
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    console.log("error"); // @TODO: error handling

    return {
      accessToken: null,
      refreshToken: null,
    };
  }

  return await response.data;
};

export const refreshTokens = async (refreshToken: string): Promise<Response> => {
  return await fetch(`${API_URL}/authenticate/refresh`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${refreshToken}`,
    },
  });
};

export const getUser = async (accessToken: string): Promise<Response> => {
  return await fetch(`${API_URL}/authenticate/user`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });
};

export const getUserGracefully = async (accessToken: string): Promise<UserInterface | null> => {
  const response = await getUser(accessToken);

  if (response.status !== 200) {
    console.log("error"); // @TODO: error handling

    return null;
  }

  return await response.json();
};

export const getUsers = async (): Promise<UserInterface[]> => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();

  if (response.status !== 200) {
    return []; // @TODO: error handling
  }

  return data;
}
