import { Controller, Get, Param, Res } from '@nestjs/common';
import { LinkService } from '@src/service/LinkService';
import { IdParamsDTO } from '@src/dto/IdParamsDTO';
import { Response } from 'express';
import { LinkInterface } from '@src/interface/LinkInterface';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getAll() {
    return this.linkService.findAll();
  }

  @Get('/:id')
  getOne(
    @Param() idParamsDto: IdParamsDTO,
    @Res() response: Response,
  ): Response<LinkInterface | null> {
    const { id } = idParamsDto;

    const link = this.linkService.findOne(id);

    if (link === null) {
      return response.status(404).send();
    }

    return response.send(link);
  }
}
