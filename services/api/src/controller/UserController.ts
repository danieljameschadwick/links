import { Controller, Get, Param, Res } from '@nestjs/common';
import { IdParamsDTO } from '@src/dto/IdParamsDTO';
import { Response } from 'express';
import { Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Body } from '@nestjs/common';
import { CreateUserDTO } from '@src/dto/User/CreateUserDTO';
import { UserService } from '@src/service/UserService';
import { UsernameParamsDTO } from '@src/dto/UsernameParamsDTO';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('/:username')
  async getOneByUsername(
    @Param() usernameParamsDto: UsernameParamsDTO,
    @Res() response: Response,
  ): Promise<Response<User | null>> {
    const { username } = usernameParamsDto;

    const user = await this.userService.findOneByUsername(username);

    if (user === null) {
      return response.status(404).send();
    }

    return response.send(user);
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDTO,
    @Res() response: Response,
  ): Promise<Response<User | null>> {
    const user = await this.userService.create(createUserDto);

    if (user === null) {
      return response.status(404).send();
    }

    return response
      .location(`/users/${user.id}`)
      .send(user)
    ;
  }
}
