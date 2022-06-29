import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '@src/module/PrismaModule';
import { LinkController } from '@src/controller/LinkController';
import { LinkService } from '@src/service/LinkService';

@Module({
  imports: [ forwardRef(() => PrismaModule) ],
  controllers: [ LinkController ],
  providers: [ LinkService ],
})
export class LinkModule {}
