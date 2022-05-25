import { Module } from '@nestjs/common';
import { AuthService } from '@src/service/AuthService';
import { LocalStrategy } from '@src/auth/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@src/module/UserModule';
import { AuthController } from '@src/controller/AuthController';

@Module({
  imports: [ UserModule, PassportModule ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy ],
})
export class AuthModule {}
