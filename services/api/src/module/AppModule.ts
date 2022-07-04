import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@src/module/AuthModule';
import { UserModule } from '@src/module/UserModule';
import { LinkModule } from '@src/module/LinkModule';
import Configuration from '@src/configuration/Configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ Configuration ],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    LinkModule,
  ],
})
export class AppModule {}
