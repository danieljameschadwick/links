import { IsOptional, IsString } from "class-validator";

export class UpdateLinkDTO {
  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsOptional()
  userId: number;
}
