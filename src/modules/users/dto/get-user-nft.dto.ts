import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SORT_ORDER, TokenTypeEnum } from 'src/utils/enum';

export class GetUserTokenDto {
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
  search: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'owned or created',
  })
  category: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ enum: TokenTypeEnum, required: false })
  tokenType: number;
}

export class GetUserNftDto {
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
  search: string;
}

export class GetUserTokenResponse {
  @Expose({ name: 'balance' })
  balance: string;

  @Expose({ name: 'token_address' })
  tokenAddress: string;

  @Expose({ name: 'token_symbol' })
  tokenSymbol: string;

  @Expose({ name: 'token_name' })
  tokenName: string;

  @Expose({ name: 'logo' })
  logo: string;

  @Expose({ name: 'total_supply' })
  totalSupply: string | number;

  @Expose({ name: 'total_nft_supply' })
  totalNftSupply: string | number;

  @Expose({ name: 'creator' })
  creator: string;

  @Expose({ name: 'description' })
  description: string;

  @Expose({ name: 'twitter_url' })
  twitterUrl: string;

  @Expose({ name: 'discord_url' })
  discordUrl: string;

  @Expose({ name: 'nfsw' })
  nfsw: boolean;

  @Expose({ name: 'price' })
  price: string;

  @Expose({ name: 'market_cap' })
  marketCap: string;

  @Expose({ name: 'nft_owned' })
  nftOwned: number;

  @Expose({ name: 'status' })
  status: number;

  @Expose({ name: 'token_type' })
  tokenType: number;
}

export class GetUserGeneratedImagesDto {
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
}
