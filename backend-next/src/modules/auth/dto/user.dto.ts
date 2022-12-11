import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UserNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;
}

export class SignUpUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class loginUserDto extends UserNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class VerifyUserDto extends UserNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class ResetPasswordDto extends VerifyUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
