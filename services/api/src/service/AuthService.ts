import { Injectable } from '@nestjs/common';
import { UserService } from '@src/service/UserService';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user && user.password && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
