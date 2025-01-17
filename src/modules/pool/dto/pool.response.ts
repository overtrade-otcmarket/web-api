import { Expose } from 'class-transformer';

export class GetListPoolResponse {
  @Expose({ name: 'pool_name' })
  poolName: string;

  @Expose({ name: 'token0_address' })
  token0Address: string;

  @Expose({ name: 'token1Address' })
  token1Address: string;

  @Expose({ name: 'token0Symbol' })
  token1Symbol: string;

  @Expose({ name: 'lowest_price' })
  lowestPrice: string;

  @Expose({ name: 'highest_price' })
  highestPrice: string;

  @Expose({ name: 'volume' })
  volume: string;

  @Expose({ name: 'volume_change' })
  volumeChange: number;

  @Expose({ name: 'pool_address' })
  poolAddress: string;

  @Expose({ name: 'token0_name' })
  token0Name: string;

  @Expose({ name: 'token0_logo' })
  token0Logo: string;
}
