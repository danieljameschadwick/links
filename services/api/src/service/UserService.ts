import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@src/service/PrismaService';
import { CreateUserDTO } from '@src/dto/User/CreateUserDTO';
import { encrypt } from '@src/util/encrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      include: {
        userProfile: {
          include: {
            links: {
              include: {
                logo: true,
              },
              orderBy: {
                displayOrder: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id: Number(id) },
      include: {
        userProfile: {
          include: {
            links: {
              include: {
                logo: true,
              },
              orderBy: {
                displayOrder: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { username },
      include: {
        userProfile: {
          include: {
            links: {
              include: {
                logo: true,
              },
              orderBy: {
                displayOrder: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      include: {
        userProfile: {
          include: {
            links: {
              include: {
                logo: true,
              },
              orderBy: {
                displayOrder: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    return await this.prismaService.user.create({
      data: createUserDTO,
    });
  }

  async logout(id: number): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        refreshToken: null,
      },
    });
  }

  async updateTokens(id: number, accessToken, refreshToken): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        password: encrypt(password),
      },
    });
  }
}
