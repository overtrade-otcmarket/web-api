import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('token')
export class TokenEntity extends DefaultEntity {
  @Column({ name: 'creator_address' })
  creatorAddress: string;

  @Column({ name: 'token_name' })
  tokenName: string;

  @Column({ name: 'token_symbol' })
  tokenSymbol: string;

  @Column({ name: 'contract_address' })
  contractAddress: string;

  @Column({ name: 'decimal' })
  decimal: number;

  @Column({ name: 'logo' })
  logo: string;

  @Column({ name: 'verify' })
  verify: number;

  @Column({ name: 'twitter_url' })
  twitterUrl: string;

  @Column({ name: 'discord_url' })
  discordUrl: string;

  @Column({ name: 'telegram_url' })
  telegramUrl: string;

  @Column({ name: 'website_url' })
  websiteUrl: string;
}
