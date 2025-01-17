import { Column, Entity } from 'typeorm';
import { DefaultEntity } from 'src/utils/entities/default.entity';
@Entity('account')
export class AccountEntity extends DefaultEntity {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'referral_code' })
  referralCode: string;

  @Column({ name: 'invite_code' })
  inviteCode: string;

  @Column({ name: 'discord_uid' })
  discordUid: string;

  @Column({ name: 'discord_username' })
  discordUsername: string;

  @Column({ name: 'discord_name' })
  discordName: string;

  @Column({ name: 'twitter_uid' })
  twitterUid: string;

  @Column({ name: 'twitter_username' })
  twitterUsername: string;

  @Column({ name: 'twitter_name' })
  twitterName: string;
}
