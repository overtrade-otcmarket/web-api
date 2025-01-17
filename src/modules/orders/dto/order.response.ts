import { Expose } from 'class-transformer';

export class GetOrderActivityResponse {
  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose({ name: 'order_creator' })
  orderCreator: string;

  @Expose({ name: 'token0_address' })
  token0Address: string;

  @Expose({ name: 'token1_address' })
  token1Address: string;

  @Expose({ name: 'token0_amount' })
  token0Amount: string;

  @Expose({ name: 'token1_amount' })
  token1Amount: string;

  @Expose({ name: 'price' })
  price: string;

  @Expose({ name: 'transaction_hash' })
  transactionHash: string;

  @Expose({ name: 'sender' })
  sender: string;

  @Expose({ name: 'order_type' })
  orderType: number;

  @Expose({ name: 'order_id' })
  orderId: number;

  @Expose({ name: 'timestamp' })
  timestamp: number;

  @Expose({ name: 'token0_name' })
  token0Name: string;

  @Expose({ name: 'token0_symbol' })
  token0Symbol: string;

  @Expose({ name: 'token0_logo' })
  token0Logo: string;
}

export class GetOrderResponse {
  @Expose({ name: 'order_creator' })
  orderCreator: string;

  @Expose({ name: 'order_type' })
  orderType: number;

  @Expose({ name: 'match_type' })
  matchType: number;

  @Expose({ name: 'token0_address' })
  token0Address: string;

  @Expose({ name: 'token1_address' })
  token1Address: string;

  @Expose({ name: 'token0_amount' })
  token0Amount: number;

  @Expose({ name: 'token1_amount' })
  token1Amount: number;

  @Expose({ name: 'price' })
  price: number;

  @Expose({ name: 'match_amount' })
  matchAmount: number;

  @Expose({ name: 'remain_amount' })
  remainAmount: number;

  @Expose({ name: 'expired_time' })
  expiredTime: number;

  @Expose({ name: 'order_id' })
  orderId: number;

  @Expose({ name: 'transaction_hash' })
  transactionHash: string;

  @Expose({ name: 'order_status' })
  orderStatus: number;

  @Expose({ name: 'price_type' })
  priceType: number;

  @Expose({ name: 'discount_percent' })
  discountPercent: number;

  @Expose({ name: 'created_at' })
  createdAt: string;
}
