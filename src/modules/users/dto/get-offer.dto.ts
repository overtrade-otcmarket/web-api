import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetUserOfferDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'item-offer/collection-offer' })
  type: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'made/receive' })
  category: string;

  @IsNotEmpty()
  networkType: number;

  @IsNotEmpty()
  walletAddress: string;

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

export class NftOfferResponse {
  @Expose({ name: 'user_address' })
  userAddress: string;

  @Expose({ name: 'owner_image' })
  ownerImage: string;

  @Expose({ name: 'price' })
  price: string;

  @Expose({ name: 'status' })
  status: number;

  @Expose({ name: 'expire_time' })
  expireTime: number;

  @Expose({ name: 'start_time' })
  startTime: number;

  @Expose({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Expose({ name: 'title' })
  nftTitle: string;

  @Expose({ name: 'nft_address' })
  nftAddress: string;

  @Expose({ name: 'image_url' })
  nftImageUrl: string;

  @Expose({ name: 'network_type' })
  networkType: number;

  @Expose({ name: 'version' })
  version: number;

  @Expose({ name: 'nonce' })
  nonce: number;

  @Expose({ name: 'offer_id' })
  offerId: number;

  @Expose({ name: 'message_hash' })
  messageHash: string;

  @Expose({ name: 'signature_r' })
  signatureR: string;

  @Expose({ name: 'signature_s' })
  signatureS: string;

  @Expose({ name: 'token_unit' })
  tokenUnit: number;

  @Expose({ name: 'token_name' })
  collectionName: string;

  @Expose({ name: 'logo' })
  collectionLogo: string;

  @Expose({ name: 'collection_address' })
  collectionAddress: string;

  @Expose({ name: 'hash_leaf' })
  hashLeaf: string;

  @Expose({ name: 'proof' })
  proof: string;

  @Expose({ name: 'root' })
  root: string;
}

export class NftCollectionOfferResponse {
  @Expose({ name: 'user_address' })
  userAddress: string;

  @Expose({ name: 'collection_address' })
  collectionAddress: string;

  @Expose({ name: 'price' })
  price: string;

  @Expose({ name: 'status' })
  status: number;

  @Expose({ name: 'quantity' })
  quantity: number;

  @Expose({ name: 'expire_time' })
  expireTime: number;

  @Expose({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Expose({ name: 'token_name' })
  collectionName: string;

  @Expose({ name: 'logo' })
  collectionLogo: string;

  @Expose({ name: 'onchain_type' })
  onchainType: string;

  @Expose({ name: 'network_type' })
  networkType: number;

  @Expose({ name: 'offer_id' })
  offerId: number;

  @Expose({ name: 'nft_type' })
  nftType: string;

  @Expose({ name: 'token_unit' })
  tokenUnit: number;
}

export class NftOfferReceivedResponse {
  @Expose({ name: 'title' })
  nftTitle: string;

  @Expose({ name: 'nft_address' })
  nftAddress: string;

  @Expose({ name: 'quantity' })
  quantity: number;

  @Expose({ name: 'image_url' })
  nftImageUrl: string;

  @Expose({ name: 'token_name' })
  collectionName: string;

  @Expose({ name: 'listing_price' })
  listingPrice: string;

  @Expose({ name: 'offer_price' })
  offerPrice: string;

  @Expose({ name: 'market_price' })
  marketPrice: string;

  @Expose({ name: 'collection_address' })
  collectionAddress: string;

  @Expose({ name: 'network_type' })
  networkType: number;

  @Expose({ name: 'token_unit' })
  tokenUnit: number;

  @Expose({ name: 'offer_list' })
  @Type(() => OfferList)
  offerList: OfferList[];
}

export class OfferList {
  @Expose({ name: 'user_address' })
  userAddress: string;

  @Expose({ name: 'owner_image' })
  ownerImage: string;

  @Expose()
  quantity: string;

  @Expose({ name: 'price' })
  price: string;

  @Expose({ name: 'status' })
  status: number;

  @Expose({ name: 'expire_time' })
  expireTime: number;

  @Expose({ name: 'start_time' })
  startTime: number;

  @Expose({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Expose({ name: 'nonce' })
  nonce: number;

  @Expose({ name: 'message_hash' })
  messageHash: string;

  @Expose({ name: 'signature_r' })
  signatureR: string;

  @Expose({ name: 'signature_s' })
  signatureS: string;
}
