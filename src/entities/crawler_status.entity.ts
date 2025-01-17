import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crawler_status')
export class CrawlStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contract_name' })
  contractName: string;

  @Column({ name: 'nft_address' })
  nftAddress: string;

  @Column({
    name: 'contract_address',
  })
  contractAddress: string;

  @Column({
    name: 'network',
  })
  network: number;

  @Column({
    name: 'code_hash',
  })
  codeHash: string;

  @Column({
    name: 'tx_digest',
  })
  txDigest: string;

  @Column({
    name: 'block_timestamp',
  })
  blockTimestamp: number;

  @Column({
    name: 'event_num_in_one_go',
  })
  eventNumInOneGo: number;

  @Column({
    name: 'module_name',
  })
  moduleName: string;

  @Column({
    name: 'mint_function',
  })
  mintFunction: string;

  @Column({
    name: 'object_type',
  })
  objectType: string;

  @Column({
    name: 'is_enable',
  })
  isEnable: boolean;

  @Column({
    name: 'event_seq',
  })
  eventSeq: number;

  @Column({
    name: 'mint_event',
  })
  mintEvent: string;

  @Column({
    name: 'type',
  })
  type: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
