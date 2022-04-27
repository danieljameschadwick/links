import { Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { PrismaService } from '@src/service/PrismaService';
import { CreateLinkDTO } from '@src/dto/link/CreateLinkDTO';
import { UpdateLinkDTO } from '@src/dto/link/UpdateLinkDTO';

@Injectable()
export class LinkService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(): Promise<Link[]> {
    return this.prismaService.link.findMany({
      include: { user: true },
    });
  }

  async findOneById(id: number): Promise<Link | null> {
    return this.prismaService.link.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        logo: true,
      },
    });
  }

  async create(CreateLinkDTO: CreateLinkDTO): Promise<Link> {
    return this.prismaService.link.create({
      data: CreateLinkDTO,
    });
  }

  async update(id: number, UpdateLinkDTO: UpdateLinkDTO): Promise<Link> {
    return this.prismaService.link.update({
      where: { id: Number(id) },
      data: UpdateLinkDTO,
    });
  }
}
