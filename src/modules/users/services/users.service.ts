import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import {
  generateReferralCode,
  transformString,
} from 'src/utils/commonFuntion/randomString';
import {
  ErrorCodeEnum,
  ErrorMessageEnum,
} from 'src/utils/enum/ErrorMessageEnum';
import { getRepository, Repository } from 'typeorm';
import {
  getUserOrdersDto,
  getUserTransactionsDto,
  UpdateUserProfileDto,
} from '../dto/create-user.dto';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import Paging from 'src/utils/commonFuntion/paging';
import { OrdersEntity } from 'src/entities/orders.entity';
import { OrdersActivityEntity } from 'src/entities/order_activity.entity';
import { TokenEntity } from 'src/entities/token.entity';
import { formatStarknetWallet } from 'src/utils/commonFuntion/formatWalletAddress';
import { plainToClass } from 'class-transformer';
import {
  GetOrderResponse,
  GetUserOrderActivityResponse,
} from '../dto/get-order.response';
import { PoolEntity } from 'src/entities/pool.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AccountEntity)
    private userRepository: Repository<AccountEntity>,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private minioClientService: MinioClientService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(walletAddress: string) {
    try {
      const user = await this.userRepository.findOne({
        walletAddress: formatStarknetWallet(walletAddress),
      });
      if (!user) {
        const createData = this.userRepository.save({
          userName: '',
          walletAddress: formatStarknetWallet(walletAddress),
          avatar: '',
          inviteCode: generateReferralCode(),
        });

        return createData;
      }
      return user;
    } catch (error) {
      console.log('Error Validate User', error);
      throw new HttpException(
        error.errorCode || ErrorCodeEnum.ERR_2,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async GetUserProfile(walletAddress: string) {
    try {
      const user = await this.userRepository.findOne({
        walletAddress: walletAddress,
      });
      if (!user) {
        throw new HttpException(ErrorCodeEnum.ERR_3, HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      console.log('Error GetUserProfile', error);
      throw new HttpException(
        error.errorCode || ErrorCodeEnum.ERR_2,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUserProfile(
    userInfo,
    dataBody: UpdateUserProfileDto,
    files: any,
  ) {
    try {
      if (!userInfo) {
        throw new HttpException(ErrorCodeEnum.ERR_3, HttpStatus.BAD_REQUEST);
      }
      const user = await this.userRepository.findOne({
        walletAddress: userInfo.walletAddress,
      });
      let fileName = '';
      if (files && files.image.length > 0) {
        const directPath = `otc-be/avatar`;
        const fileLogo = files.image[0];

        const fileMime = fileLogo.originalname.slice(
          fileLogo.originalname.lastIndexOf('.'),
          fileLogo.originalname.length,
        );

        if (fileLogo.size > 52428800) {
          throw new HttpException(
            ErrorMessageEnum.ERR_9,
            HttpStatus.BAD_REQUEST,
          );
        }
        fileName =
          transformString(fileLogo.originalname) +
          Date.now().toString() +
          fileMime;

        await this.minioClientService.uploadSingle(
          fileLogo,
          directPath,
          fileName,
        );
      }
      const updatedUser = await this.userRepository.save({
        id: user.id,
        userName: dataBody.userName,
        avatar:
          files && files.image.length > 0
            ? 'https://' +
              process.env.MINIO_ENDPOINT +
              ':' +
              process.env.MINIO_PORT +
              '/' +
              process.env.MINIO_BUCKET +
              `/otc/avatar/` +
              fileName
            : user.avatar,
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        error.errorCode || ErrorCodeEnum.ERR_2,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserProfile(walletAddress: string) {
    try {
      const userProfile = await this.userRepository.findOne({
        walletAddress: walletAddress,
      });
      if (!userProfile) {
        throw new HttpException(ErrorCodeEnum.ERR_3, HttpStatus.BAD_REQUEST);
      }
      return userProfile;
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserOrders(dataQuery: getUserOrdersDto, userInfo) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);
      const userProfile = await this.userRepository.findOne({
        walletAddress: userInfo.walletAddress,
      });
      if (!userProfile) {
        throw new HttpException(ErrorCodeEnum.ERR_3, HttpStatus.BAD_REQUEST);
      }

      const createQuery = getRepository(OrdersEntity)
        .createQueryBuilder('oe')
        .where('oe.order_creator = :walletAddress', {
          walletAddress: userInfo.walletAddress,
        });
      /// addWhere Conditions
      if (dataQuery.filter && dataQuery.filter != '') {
        createQuery.andWhere(`oe.token0_address ILIKE '%:filterString%'`, {
          filterString: dataQuery.filter,
        });
      }
      if (dataQuery.searchBy != null) {
        switch (dataQuery.searchBy) {
          case 0: {
            // BUY
            createQuery.andWhere('oe.order_type = 0');
            break;
          }
          case 1: {
            // SELL
            createQuery.andWhere('oe.order_type = 1');
            break;
          }
          case 2: {
            // Partial
            createQuery.andWhere('oe.match_type = 0');
            break;
          }
          case 3: {
            // Full
            createQuery.andWhere('oe.match_type = 1');
            break;
          }
        }
      }
      createQuery.andWhere('oe.order_status = 1');
      if (
        dataQuery.token0 &&
        dataQuery.token0 != '' &&
        dataQuery.token1 &&
        dataQuery.token1 != ''
      ) {
        createQuery.andWhere(
          'oe.token0_address = :token0Address AND oe.token1_address = :token1Address',
          {
            token0Address: dataQuery.token0,
            token1Address: dataQuery.token1,
          },
        );
      }

      createQuery
        .select(
          `
        oe.id,  
        oe.order_creator,
        oe.token0_address,
        oe.token1_address,
        oe.token0_amount,
        oe.token1_amount,
        CASE 
          WHEN oe.price_type = 1 THEN p.market_price - p.market_price * oe.discount_percent / 100 
            ELSE oe.price 
        END AS price,
        oe.transaction_hash,
        oe.order_type,
        oe.match_type,
        oe.order_id,
        oe.order_status,
        oe.expired_time,
        oe.match_amount,
        oe.remain_amount,
        oe.price_type,
        oe.discount_percent,
        token.token_name as token0_name,
        token.token_symbol as token0_symbol,
        token.logo as token0_logo
      `,
        )
        .leftJoin(
          TokenEntity,
          'token',
          'oe.token0_address = token.contract_address',
        )
        .leftJoin(
          PoolEntity,
          'p',
          'p.token0_address = oe.token0_address and p.token1_address = oe.token1_address',
        );

      const rawData = await createQuery
        .offset(paging.skip)
        .limit(paging.take)
        .getRawMany();

      const totalCount = await createQuery.getCount();

      return {
        rows: plainToClass(GetOrderResponse, rawData, {
          excludeExtraneousValues: true,
        }),
        totalCount: totalCount,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserTransactions(dataQuery: getUserTransactionsDto, userInfo) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);
      const userProfile = await this.userRepository.findOne({
        walletAddress: userInfo.walletAddress,
      });
      if (!userProfile) {
        throw new HttpException(ErrorCodeEnum.ERR_3, HttpStatus.BAD_REQUEST);
      }

      const createQuery = getRepository(OrdersActivityEntity)
        .createQueryBuilder('oe')
        .where('oe.order_creator = :creatorAddress', {
          creatorAddress: userInfo.walletAddress,
        });
      /// addWhere Conditions
      if (
        dataQuery.token0 &&
        dataQuery.token0 != '' &&
        dataQuery.token1 &&
        dataQuery.token1 != ''
      ) {
        createQuery.andWhere(
          'oe.token0_address = :token0Address AND oe.token1_address = :token1Address',
          {
            token0Address: dataQuery.token0,
            token1Address: dataQuery.token1,
          },
        );
      }

      createQuery
        .select(
          `
      oe.id,  
      oe.order_creator,
      oe.token0_address,
      oe.token1_address,
      oe.token0_amount,
      oe.token1_amount,
      oe.price,
      oe.transaction_hash,
      oe.order_type,
      oe.sender,
      oe.order_id,
      oe.timestamp,
      token.token_name as token0_name,
      token.token_symbol as token0_symbol,
      token.logo as token0_logo
    `,
        )
        .leftJoin(
          TokenEntity,
          'token',
          'oe.token0_address = token.contract_address',
        );

      const rawData = await createQuery
        .skip(paging.skip)
        .take(paging.take)
        .getRawMany();

      const totalCount = await createQuery.getCount();

      return {
        rows: plainToClass(GetUserOrderActivityResponse, rawData, {
          excludeExtraneousValues: true,
        }),
        totalCount: totalCount,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }
}
