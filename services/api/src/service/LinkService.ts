import { Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { PrismaService } from '@src/service/PrismaService';
import { CreateLinkDTO } from '@src/dto/Link/CreateLinkDTO';
import { UpdateLinkDTO } from '@src/dto/Link/UpdateLinkDTO';


@Injectable()
export class LinkService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(): Promise<Link[]> {
    return this.prismaService.link.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number): Promise<Link | null> {
    return this.prismaService.link.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
  }

  async create(createLinkDTO: CreateLinkDTO): Promise<Link> {
    return this.prismaService.link.create({
      data: createLinkDTO,
    });
  }

  async update(id: number, updateLinkDTO: UpdateLinkDTO): Promise<Link> {
    return this.prismaService.link.update({
      where: { id: Number(id) },
      data: updateLinkDTO,
    });
  }
}
