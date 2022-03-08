import { Controller, Get, Param, Res } from '@nestjs/common';
import { LinkService } from '@src/service/LinkService';
import { IdParamsDTO } from '@src/dto/IdParamsDTO';
import { Response } from 'express';
import { Post } from '@nestjs/common';
import { Link } from '@prisma/client';
import { Body } from '@nestjs/common';
import { CreateLinkDTO } from '@src/dto/Link/CreateLinkDTO';
import { UpdateLinkDTO } from '@src/dto/Link/UpdateLinkDTO';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getAll() {
    return this.linkService.findAll();
  }

  @Get('/:id')
  async getOne(
    @Param() idParamsDto: IdParamsDTO,
    @Res() response: Response,
  ): Promise<Response<Link | null>> {
    const { id } = idParamsDto;

    const link = await this.linkService.findOne(id);

    if (link === null) {
      return response.status(404).send();
    }

    return response.send(link);
  }

  @Post()
  async create(
    @Body() createLinkDto: CreateLinkDTO,
    @Res() response: Response,
  ): Promise<Response<Link | null>> {
    const link = await this.linkService.create(createLinkDto);

    if (link === null) {
      return response.status(404).send();
    }

    return response
      .location(`/links/${link.id}`)
      .send(link)
    ;
  }

  @Post('/:id')
  async update(
    @Param() idParamsDto: IdParamsDTO,
    @Body() updateLinkDto: UpdateLinkDTO,
    @Res() response: Response,
  ): Promise<Response<Link | null>> {
    const { id } = idParamsDto;
    const link = await this.linkService.findOne(id);

    if (link === null) {
      return response.status(404).send();
    }

    await this.linkService.update(id, updateLinkDto);

    return response
      .status(204)
      .send()
    ;
  }
}
