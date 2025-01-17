import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('pool')
export class PoolEntity extends DefaultEntity {
  @Column({ name: 'pool_name' })
  poolName: string;

  @Column({ name: 'pool_address' })
  poolAddress: string;

  @Column({ name: 'transaction_hash' })
  transactionHash: string;

  @Column({ name: 'token0_address' })
  token0Address: string;

  @Column({ name: 'token1_address' })
  token1Address: string;

  @Column({ name: 'token0_symbol' })
  token0Symbol: string;

  @Column({ name: 'token1_symbol' })
  token1Symbol: string;

  @Column({ name: 'lowest_price' })
  lowestPrice: number;

  @Column({ name: 'highest_price' })
  highestPrice: number;

  @Column({ name: 'volume' })
  volume: number;

  @Column({ name: 'volume_change' })
  volumeChange: number;

  @Column({ name: 'market_price' })
  marketPrice: number;

  @Column({ name: 'twitter_url' })
  twitterUrl: string;

  @Column({ name: 'discord_url' })
  discordUrl: string;

  @Column({ name: 'telegram_url' })
  telegramUrl: string;

  @Column({ name: 'website_url' })
  websiteUrl: string;

  @Column({ name: '24h_volume' })
  dailyVolume: string;
}
