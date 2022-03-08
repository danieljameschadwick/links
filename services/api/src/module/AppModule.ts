import { Module } from '@nestjs/common';
import { LinkModule } from '@src/module/LinkModule';
import { UserModule } from '@src/module/UserModule';

@Module({
  imports: [LinkModule, UserModule],
})
export class AppModule {}
