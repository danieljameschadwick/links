import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Transform } from 'class-transformer';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @Encrypt()
  @Transform(({ value }) => bcrypt.hash(value, 10))
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
