import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

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

export class loginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}