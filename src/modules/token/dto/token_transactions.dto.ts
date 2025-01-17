import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTokenTransactionDto {
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
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  tokenAddress: string;
}
