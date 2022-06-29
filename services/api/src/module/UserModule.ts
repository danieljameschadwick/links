import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '@src/module/PrismaModule';
import { UserController } from '@src/controller/UserController';
import { UserService } from '@src/service/UserService';

@Module({
  imports: [ forwardRef(() => PrismaModule) ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ],
})
export class UserModule {}
