import { Module } from '@nestjs/common';
import { LinkController } from '@src/controller/LinkController';
import { LinkService } from '@src/service/LinkService';
import { PrismaModule } from '@src/module/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
