import { Expose } from 'class-transformer';
import { CollectionActivitySearchTypeEnum } from 'src/utils/enum';

export class ActivityResponse {
  @Expose({ name: 'image_url' })
  imageUrl: string;

  @Expose({ name: 'nft_address' })
  nftAddress: string;

  @Expose({ name: 'from_address' })
  fromAddress: string;

  @Expose({ name: 'user_address' })
  userAddress: boolean;

  @Expose({ name: 'activity' })
  activity: CollectionActivitySearchTypeEnum;

  @Expose({ name: 'transaction_id' })
  transactionId: string;

  @Expose({ name: 'timestamp' })
  timestamp: string;

  @Expose({ name: 'price' })
  price: string;

  @Expose()
  quantity: number;

  @Expose()
  ranking: number;

  @Expose({ name: 'block_timestamp' })
  expireTime: number;

  @Expose({ name: 'network_type' })
  networkType: number;

  @Expose({ name: 'token_unit' })
  tokenUnit: number;
}

export class LatestTransactionResponse {
  @Expose({ name: 'wallet_address' })
  walletAddress: string;

  @Expose({ name: 'activity' })
  activity: number;

  @Expose({ name: 'created_at' })
  created_at: string;

  @Expose({ name: 'token_in_address' })
  tokenInAddress: string;

  @Expose({ name: 'token_out_address' })
  tokenOutAddress: string;

  @Expose({ name: 'token_in_amount' })
  tokenInAmount: string;

  @Expose({ name: 'token_out_amount' })
  tokenOutAmount: string;

  @Expose({ name: 'transaction_hash' })
  transactionHash: string;

  @Expose({ name: 'token_name' })
  tokenName: string;

  @Expose({ name: 'token_symbol' })
  tokenSymbol: string;

  @Expose({ name: 'logo' })
  logo: string;

  @Expose({ name: 'user_name' })
  userName: string;

  @Expose({ name: 'avatar' })
  avatar: string;
}
