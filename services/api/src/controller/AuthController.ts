import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/LocalAuthGuard';
import { AuthService } from '@src/service/AuthService';
import { JwtAuthGuard } from '@src/auth/JwtAuthGuard';

@Controller('/authenticate')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() request) {
    return request.user;
  }
}
