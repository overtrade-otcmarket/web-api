import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SORT_ORDER, TokenTypeEnum } from 'src/utils/enum';

export class GetAllTokenDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortField?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: SORT_ORDER, required: false })
  orderBy?: SORT_ORDER;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  search?: string;
}

export class QuoteTokenDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  search: string;
}

export class GetAllCollectionDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortField: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: SORT_ORDER, required: false })
  orderBy: SORT_ORDER;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  search: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: Boolean, required: false })
  @Transform(({ value }) => value === 'true')
  nfsw: boolean;
}
