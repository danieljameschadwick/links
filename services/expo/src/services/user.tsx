import axios from "axios";
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

export const getUser = async (accessToken: string): Promise<UserInterface | null> => {
  console.log(`${API_URL}/authenticate/user`);

  const response = await axios.get(`${API_URL}/authenticate/user`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    console.log("error"); // @TODO: error handling

    return null;
  }

  return await response.data;
};
