import { Expose } from 'class-transformer';

export class TransactionResponse {
  @Expose({ name: 'wallet_address' })
  walletAddress: string;

  @Expose({ name: 'activity' })
  activity: number;

  @Expose({ name: 'token_in_address' })
  tokenInAddress: string;

  @Expose({ name: 'token_out_address' })
  tokenOutAddress: string;

  @Expose({ name: 'token_in_amount' })
  tokenInAmount: number;

  @Expose({ name: 'token_out_amount' })
  tokenOutAmount: number;

  @Expose({ name: 'transaction_hash' })
  transactionHash: string;

  @Expose({ name: 'timestamp' })
  timestamp: number;

  @Expose({ name: 'created_at' })
  createdAt: string;
}
