import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '@src/service/UserService';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens, JwtPayload } from '@src/auth/Types';
import { encrypt } from '@src/util/encrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
  }

  /**
   * @TODO: type response
   */
  async validateUserByPassword(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user && user.password && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * @TODO: type user
   */
  async login(user: User): Promise<Tokens> {
    const tokens = await this.getTokens(user.id, user.email);
    await this.hashAndUpdateTokens(user.id, tokens);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.userService.logout(userId);

    return true;
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findOneById(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = bcrypt.compareSync(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.hashAndUpdateTokens(user.id, tokens);

    return tokens;
  }

  async hashAndUpdateTokens(userId: number, tokens: Tokens): Promise<void> {
    const { accessToken, refreshToken } = tokens;
    const hashedAccessToken = encrypt(accessToken);
    const hashedRefreshToken = encrypt(refreshToken);

    await this.userService.updateTokens(userId, hashedAccessToken, hashedRefreshToken);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [ accessToken, refreshToken ] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
