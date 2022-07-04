import { Module } from '@nestjs/common';
import { AuthService } from '@src/service/AuthService';
import { LocalStrategy } from '@src/auth/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@src/module/UserModule';
import { AuthController } from '@src/controller/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@src/auth/JwtStrategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: config.get<number>('jwtExpirationTime'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {}
