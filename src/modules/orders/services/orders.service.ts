import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import Paging from 'src/utils/commonFuntion/paging';
import { OrdersEntity } from 'src/entities/orders.entity';
import {
  GetOrdersByTokenDto,
  getListOrderActivityDto,
  getListOrderDto,
} from '../dto/order-request.dto';
import { OrdersActivityEntity } from 'src/entities/order_activity.entity';
import { SORT_ORDER } from 'src/utils/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { ORDER_MATCH_TYPE } from 'src/utils/enum/commonEnum';
import { plainToClass } from 'class-transformer';
import {
  GetOrderActivityResponse,
  GetOrderResponse,
} from '../dto/order.response';
import { PoolEntity } from 'src/entities/pool.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
  ) {}

  async getOrderBooks(dataQuery: getListOrderDto) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);

      const createQuery = getRepository(OrdersEntity)
        .createQueryBuilder('oe')
        .where(
          'oe.token0_address = :token0Address AND oe.token1_address = :token1Address',
          {
            token0Address: dataQuery.token0,
            token1Address: dataQuery.token1,
          },
        );
      /// addWhere Conditions
      const rawData = await createQuery
        .skip(paging.skip)
        .take(paging.take)
        .getMany();

      const totalCount = await createQuery.getCount();

      return {
        rows: rawData,
        totalCount: totalCount,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrdersByTokenAddress(
    tokenAddress: string,
    query: GetOrdersByTokenDto,
  ) {
    try {
      const token = await this.tokenRepository.findOne({
        contractAddress: tokenAddress,
      });

      if (!token)
        throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
      const paging = Paging(query.page || 1, query.limit || 10);
      const createQuery = this.ordersRepository
        .createQueryBuilder('oe')
        .select(
          `
          oe.order_creator,
          oe.order_type,
          oe.match_type,
          oe.token0_address,
          oe.token1_address,
          oe.token0_amount,
          oe.token1_amount,
          CASE 
            WHEN oe.price_type = 1 THEN p.market_price - p.market_price * oe.discount_percent / 100 
            ELSE oe.price 
          END AS price,
          oe.match_amount,
          oe.remain_amount,
          oe.expired_time,
          oe.order_id,
          oe.transaction_hash,
          oe.order_status,
          oe.price_type,
          oe.discount_percent,
          oe.created_at
        `,
        )
        .leftJoin(
          PoolEntity,
          'p',
          'p.token0_address = oe.token0_address and p.token1_address = oe.token1_address',
        )
        .where(
          'oe.token0_address = :token0Address AND oe.order_status = 1 AND oe.expired_time > :timeNow',
          {
            token0Address: tokenAddress,
            timeNow: Math.floor(Date.now() / 1000),
          },
        );

      /// addWhere Conditions

      if (query.matchType >= 0)
        createQuery.andWhere('oe.matchType = :matchType', {
          matchType: query.matchType,
        });
      if (query.orderType >= 0)
        createQuery.andWhere('oe.orderType = :orderType', {
          orderType: query.orderType,
        });
      if (query.sortField)
        createQuery.orderBy(
          `oe.${query.sortField}`,
          query.orderBy || SORT_ORDER.ASC,
        );
      else createQuery.orderBy('oe.createdAt', SORT_ORDER.DESC);

      const rawData = await createQuery
        .skip(paging.skip)
        .take(paging.take)
        .getRawMany();

      const countTotal = await createQuery.getCount();
      const convertData = plainToClass(GetOrderResponse, rawData, {
        excludeExtraneousValues: true,
      });
      const finalData = convertData.map((record) => ({
        ...record,
        token0Logo: token.logo,
      }));

      return {
        rows: finalData,
        totalCount: countTotal,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderActivity(dataQuery: getListOrderActivityDto) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);

      const createQuery = getRepository(OrdersActivityEntity)
        .createQueryBuilder('oae')
        .where(
          'oae.token0_address = :token0Address AND oae.token1_address = :token1Address',
          {
            token0Address: dataQuery.token0,
            token1Address: dataQuery.token1,
          },
        );
      /// addWhere Conditions
      const rawData = await createQuery
        .orderBy('oae.timestamp', 'DESC')
        .skip(paging.skip)
        .take(paging.take)
        .getMany();

      const totalCount = await createQuery.getCount();

      return {
        rows: rawData,
        totalCount: totalCount,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllActivity(dataQuery) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);

      const createQuery =
        getRepository(OrdersActivityEntity).createQueryBuilder('oae');

      createQuery
        .select(
          `
        oae.created_at,  
        oae.order_creator,
        oae.token0_address,
        oae.token1_address,
        oae.token0_amount,
        oae.token1_amount,
        oae.price,
        oae.transaction_hash,
        oae.sender,
        oae.order_type,
        oae.order_id,
        oae.timestamp,
        token.token_name as token0_name,
        token.token_symbol as token0_symbol,
        token.logo as token0_logo
      `,
        )
        .leftJoin(
          TokenEntity,
          'token',
          'oae.token0_address = token.contract_address',
        );

      /// addWhere Conditions
      const rawData = await createQuery
        .skip(paging.skip)
        .take(paging.take)
        .orderBy('oae.created_at', 'DESC')
        .getRawMany();

      return {
        rows: plainToClass(GetOrderActivityResponse, rawData, {
          excludeExtraneousValues: true,
        }),
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getNewActivity() {
    try {
      const createQuery =
        getRepository(OrdersActivityEntity).createQueryBuilder('oae');
      /// addWhere Conditions
      createQuery
        .select(
          `
      oae.id,
      oae.created_at,  
      oae.order_creator,
      oae.token0_address,
      oae.token1_address,
      oae.token0_amount,
      oae.token1_amount,
      oae.price,
      oae.transaction_hash,
      oae.order_type,
      oae.sender,
      oae.order_id,
      oae.timestamp,
      token.token_name as token0_name,
      token.token_symbol as token0_symbol,
      token.logo as token0_logo
    `,
        )
        .leftJoin(
          TokenEntity,
          'token',
          'oae.token0_address = token.contract_address',
        );

      const rawData = await createQuery
        .take(20)
        .orderBy('oae.created_at', 'DESC')
        .getRawMany();

      return {
        rows: plainToClass(GetOrderActivityResponse, rawData, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }
}
