import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserProfileDTO {
  @IsEmail()
  @IsNotEmpty()
  heading: string;

  @IsString()
  @IsOptional()
  subHeading?: string | null;
}
