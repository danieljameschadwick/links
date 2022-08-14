import { TokensInterface } from "@links/types/interfaces/TokensInterface";
import { UserInterface } from "@links/types/interfaces/UserInterface";
import { HttpMethod } from "@links/http/enum/HttpMethod";

export const postLogin = async (apiUrl: string, username: string, password: string): Promise<TokensInterface> => {
  const response = await fetch(
    `${apiUrl}/authenticate/login`,
    {
      method: HttpMethod.POST,
      body: JSON.stringify({
        username,
        password,
      }),
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

  return await response.json();
};

export const refreshTokens = async (apiUrl: string, refreshToken: string): Promise<Response> => {
  return await fetch(`${apiUrl}/authenticate/refresh`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${refreshToken}`,
    },
  });
};

export const getUser = async (apiUrl: string, accessToken: string): Promise<Response> => {
  return await fetch(`${apiUrl}/authenticate/user`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });
};

export const getUserGracefully = async (apiUrl: string, accessToken: string): Promise<UserInterface | null> => {
  const response = await getUser(apiUrl, accessToken);

  if (response.status !== 200) {
    console.log("error"); // @TODO: error handling

    return null;
  }

  return await response.json();
};

export const getUsers = async (apiUrl: string): Promise<UserInterface[]> => {
  const response = await fetch(`${apiUrl}/users`);
  const data = await response.json();

  if (response.status !== 200) {
    return []; // @TODO: error handling
  }

  return data;
}
