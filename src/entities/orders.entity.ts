import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('orders')
export class OrdersEntity extends DefaultEntity {
  @Column({ name: 'order_creator' })
  orderCreator: string;

  @Column({ name: 'order_type' })
  orderType: number;

  @Column({ name: 'order_status' })
  orderStatus: number;

  @Column({ name: 'transaction_hash' })
  transactionHash: string;

  @Column({ name: 'match_type' })
  matchType: number;

  @Column({ name: 'token0_address' })
  token0Address: string;

  @Column({ name: 'token1_address' })
  token1Address: string;

  @Column({ name: 'token0_amount' })
  token0Amount: number;

  @Column({ name: 'token1_amount' })
  token1Amount: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'expired_time' })
  expiredTime: number;

  @Column({ name: 'match_amount' })
  matchAmount: number;

  @Column({ name: 'remain_amount' })
  remainAmount: number;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'price_type' })
  priceType: number;

  @Column({ name: 'discount_percent' })
  discountPercent: number;
}
