import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class MailDto {
  @ApiProperty()
  @IsOptional()
  from: string

  @ApiProperty()
  to: string

  @ApiProperty()
  subject: string;

  @ApiProperty()
  html: string;


}