import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';

export class CreateSplitDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ enum: ['group'] })
  @IsString()
  @IsEnum(['group', 'users'])
  type: string;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsString()
  description: string;

  @Type(() => SplitterDto)
  @ValidateNested()
  splitters: SplitterDto[];
}

export class SplitterDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  ration: number;

  @ApiProperty()
  @IsOptional()
  groupId: number;

  @ApiProperty()
  @IsOptional()
  userId: number;
}

export class SettleDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class SettleByPayeeDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  borrowerId: number
}