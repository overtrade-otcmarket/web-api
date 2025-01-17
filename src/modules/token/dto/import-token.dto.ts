import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TokenTypeEnum } from 'src/utils/enum';

export class ImportTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  tokenAddress: string;
}

export class CreateToken20Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  tokenName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  tokenAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  tokenSymbol: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  twitterUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  discordUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  websiteUrl: string;
}

export class UpdateTokenInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  tokenAddress: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  twitterUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  discordUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  websiteUrl: string;
}
