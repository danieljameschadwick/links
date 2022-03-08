import { IsNotEmpty } from 'class-validator';

export class IdParamsDTO {
  // @IsNumber()
  @IsNotEmpty()
  id: number;
}
