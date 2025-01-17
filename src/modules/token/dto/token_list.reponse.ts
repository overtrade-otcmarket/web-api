import { Expose, Transform } from 'class-transformer';

export class TokenListResponse {
  @Expose({ name: 'token_address' })
  tokenAddress: string;

  @Expose({ name: 'token_name' })
  tokenName: string;

  @Expose({ name: 'token_symbol' })
  tokenSymbol: string;

  @Expose({ name: 'description' })
  description: string;

  @Expose({ name: 'logo' })
  logo: string;

  @Expose({ name: 'token_type' })
  @Transform(({ value }) => +value)
  tokenType: number;

  @Expose({ name: 'status' })
  @Transform(({ value }) => +value)
  status: number;

  @Expose({ name: 'liquidity' })
  liquidity: number;

  @Expose({ name: 'creator' })
  creator: string;

  @Expose({ name: 'created_at' })
  createdAt: string;
}

export class CollectionListResponse {
  @Expose({ name: 'token_address' })
  tokenAddress: string;

  @Expose({ name: 'token_name' })
  tokenName: string;

  @Expose({ name: 'token_symbol' })
  tokenSymbol: string;

  @Expose({ name: 'description' })
  description: string;

  @Expose({ name: 'logo' })
  logo: string;

  @Expose({ name: 'token_type' })
  @Transform(({ value }) => +value)
  tokenType: number;

  @Expose({ name: 'status' })
  @Transform(({ value }) => +value)
  status: number;

  @Expose({ name: 'creator' })
  creator: string;

  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose({ name: 'floor_price' })
  floorPrice: number;

  @Expose({ name: 'total_volume' })
  totalVolume: number;

  @Expose({ name: 'total_nft' })
  totalNft: number;

  @Expose({ name: 'nfts' })
  nfts: string[];
}
