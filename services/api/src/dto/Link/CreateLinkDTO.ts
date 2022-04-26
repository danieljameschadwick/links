import { IsNotEmpty, IsString } from "class-validator";

export class CreateLinkDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
