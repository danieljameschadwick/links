import { IsOptional, IsString } from "class-validator";

export class UpdateLinkDTO {
  @IsString()
  @IsOptional()
  text: string;

  @IsOptional()
  userId: number;
}
