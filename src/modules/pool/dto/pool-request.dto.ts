import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SORT_ORDER } from 'src/utils/enum';

export class GetListPoolDto {
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
}

export class getDetailPoolDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false })
  token0: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: false })
  token1: string;
}
