import { Controller, Request, Post, UseGuards, Get, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/LocalAuthGuard';
import { AuthService } from '@src/service/AuthService';
import { Tokens } from '@src/auth/Types';
import { RefreshTokenGuard } from '@src/auth/tokenGuard/RefreshTokenGuard';
import { GetCurrentUserId } from '@src/auth/decorators/GetCurrentUserId';
import { GetCurrentUser } from '@src/auth/decorators/GetCurrentUser';
import { AccessTokenGuard } from '@src/auth/tokenGuard/AccessTokenGuard';
import { UserService } from '@src/service/UserService';
import { ResetPasswordDTO } from '@src/dto/User/ResetPasswordDTO';

@Controller('/authenticate')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number
  ): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @GetCurrentUserId() id: number,
    @Body() body: ResetPasswordDTO,
  ): Promise<void> {
    const { password } = body;

    return this.authService.resetPassword(id, password);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/user')
  profile(@Request() request) {
    const { email } = request.user;

    return this.userService.findOneByEmail(email);
  }
}
