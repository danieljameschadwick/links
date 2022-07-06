export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
