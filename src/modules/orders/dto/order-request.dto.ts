import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SORT_ORDER } from 'src/utils/enum';
import { ORDER_MATCH_TYPE, ORDER_TYPE } from 'src/utils/enum/commonEnum';

export class GetOrdersByTokenDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: false })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  matchType: ORDER_MATCH_TYPE;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  @Type(() => Number)
  orderType: ORDER_TYPE;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortField: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: SORT_ORDER, required: false })
  orderBy: SORT_ORDER;
}

export class getListOrderDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: false })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit: number;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  matchType: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortBy: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortOrder: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  token0: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  token1: string;
}

export class getListOrderActivityDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  limit: number;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  matchType: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortBy: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  sortOrder: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  searchType: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  token0: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  token1: string;
}

export class getAllActivityDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  limit: number;
}
