import { Module } from '@nestjs/common';
import { LinkModule } from '@src/module/LinkModule';
import { PrismaService } from '@src/service/PrismaService';

@Module({
  providers: [ PrismaService ],
  exports: [ PrismaService ],
})
export class PrismaModule {}
