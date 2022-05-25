import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/LocalAuthGuard';

@Controller('/authenticate')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
