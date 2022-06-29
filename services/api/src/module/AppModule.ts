import { Module } from '@nestjs/common';
import { AuthModule } from '@src/module/AuthModule';
import { UserModule } from '@src/module/UserModule';
import { LinkModule } from '@src/module/LinkModule';

@Module({
  imports: [ AuthModule, UserModule, LinkModule ],
})
export class AppModule {}
