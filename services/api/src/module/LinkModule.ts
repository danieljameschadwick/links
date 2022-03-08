import { Module } from '@nestjs/common';
import { LinkController } from '@src/controller/LinkController';
import { LinkService } from '@src/service/LinkService';

@Module({
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
