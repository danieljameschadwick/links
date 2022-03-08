import { IsNotEmpty } from 'class-validator';

export class IdParamsDTO {
  // @IsNumber() // @TODO: fix constraints
  @IsNotEmpty()
  id: number;
}
