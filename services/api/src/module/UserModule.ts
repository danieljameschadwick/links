import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/module/PrismaModule';
import { UserService } from '@src/service/UserService';
import { UserController } from '@src/controller/UserController';

@Module({
  imports: [ PrismaModule ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ],
})
export class UserModule {}
