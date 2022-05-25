import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EncryptDecorator } from '@src/decorator/encryptDecorator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @EncryptDecorator()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
