import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('order_activity')
export class OrdersActivityEntity extends DefaultEntity {
  @Column({ name: 'order_creator' })
  orderCreator: string;

  @Column({ name: 'order_type' })
  orderType: number;

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

  @Column({ name: 'transaction_hash' })
  transactionHash: string;

  @Column({ name: 'sender' })
  sender: string;

  @Column({ name: 'order_id' })
  orderId: string;
}
