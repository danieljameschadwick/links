import { Module } from '@nestjs/common';
import { AppController } from '@src/controller/AppController';
import { LinkModule } from '@src/module/LinkModule';

@Module({
  imports: [LinkModule],
  controllers: [AppController],
})
export class AppModule {}
