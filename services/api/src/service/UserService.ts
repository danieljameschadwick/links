import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { PrismaService } from '@src/service/PrismaService';
import { CreateUserDTO } from '@src/dto/User/CreateUserDTO';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: { links: true },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
      include: { links: true },
    });
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    return this.prismaService.user.create({
      data: createUserDTO
    });
  }
}
