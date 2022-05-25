import { Module } from '@nestjs/common';
import { AuthModule } from '@src/module/AuthModule';
import { LinkModule } from '@src/module/LinkModule';
import { UserModule } from '@src/module/UserModule';

@Module({
  imports: [ AuthModule, LinkModule, UserModule ],
})
export class AppModule {}
