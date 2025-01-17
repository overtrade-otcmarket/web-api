import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { TokenAssetsEntity } from './entities/token_assets.entity';
import { ConsumerService } from './kafka/consumer.service';
import { MinioClientService } from './minio-client/minio-client.service';
import { TokenService } from './modules/token/token.service';
import { UsersService } from './modules/users/services/users.service';
// import { TransactionEntity } from './entities/transactions.entity';
@Injectable()
export class TestConsumer implements OnModuleInit {
  private apiUrl: string;

  constructor(
    private minioClientService: MinioClientService,
    private readonly consumerService: ConsumerService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('SOCKET_SERVER');
  }
  private readonly logger = new Logger(TestConsumer.name);

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'general-solana' },
      config: { groupId: 'general-solana-1' },
      onMessage: async (message) => {
        console.log({
          value: JSON.parse(message.value.toString()),
        });
      },
    });
    await this.consumerService.consume({
      topic: { topic: 'market' },
      config: { groupId: 'market' },
      onMessage: async (message) => {
        console.log({
          value: JSON.parse(message.value.toString()),
        });
        // const data = JSON.parse(message.value.toString());
        // const {
        //   activity,
        //   tokenUnit,
        //   networkType,
        //   collectionAddress,
        //   fromAddress,
        //   userAddress,
        //   nftAddress,
        //   price,
        //   transactionId,
        // } = data;
        // switch (Number(activity)) {
        //   case CollectionActivityTypeEnum.COMPLETE: {
        //     try {
        //       await this.userService.updateUserVolumeStreak(fromAddress);
        //       await this.userService.updateUserVolumeStreak(userAddress);
        //     } catch (error) {
        //       console.log(error);
        //     }

        //     break;
        //   }
        //   case CollectionActivityTypeEnum.ACCEPT_OFFER: {
        //     try {
        //       await this.userService.updateUserVolumeStreak(fromAddress);
        //       await this.userService.updateUserVolumeStreak(userAddress);
        //     } catch (error) {
        //       console.log(error);
        //     }

        //     break;
        //   }
        //   case CollectionActivityTypeEnum.ACCEPT_COLLECTION_OFFER: {
        //     try {
        //       await this.userService.updateUserVolumeStreak(fromAddress);
        //       await this.userService.updateUserVolumeStreak(userAddress);
        //     } catch (error) {
        //       console.log(error);
        //     }

        //     break;
        //   }
        // }
      },
    });
  }
}
