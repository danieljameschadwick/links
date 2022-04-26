import { IsNotEmpty } from 'class-validator';

export class UsernameParamsDTO {
  @IsNotEmpty()
  username: string;
}
