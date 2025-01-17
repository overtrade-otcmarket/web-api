import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, Repository, getRepository } from 'typeorm';
import Paging from 'src/utils/commonFuntion/paging';
import { getDetailPoolDto, GetListPoolDto } from '../dto/pool-request.dto';
import { PoolEntity } from 'src/entities/pool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { plainToClass } from 'class-transformer';
import { GetListPoolResponse } from '../dto/pool.response';

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(PoolEntity)
    private poolRepository: Repository<PoolEntity>,
  ) {}

  async getListPool(dataQuery: GetListPoolDto) {
    try {
      const paging = Paging(dataQuery.page || 1, dataQuery.limit || 10);

      const createQuery = this.poolRepository.createQueryBuilder('pool');

      if (dataQuery.search) {
        createQuery.andWhere(
          new Brackets((qb) => {
            qb.where('pool.token0Symbol ILIKE :search', {
              search: `%${dataQuery.search}%`,
            }).orWhere('pool.token1Symbol ILIKE :search', {
              search: `%${dataQuery.search}%`,
            });
          }),
        );
      }

      if (dataQuery.sortField)
        createQuery.orderBy(`pool.${dataQuery.sortField}`, dataQuery.orderBy);
      else createQuery.orderBy('pool.createdAt', 'DESC');

      /// addWhere Conditions
      createQuery
        .select(
          `
        pool.pool_name,
        pool.token0_address,
        pool.token1_address,
        pool.token0_symbol,
        pool.token1_symbol,
        pool.lowest_price,
        pool.highest_price,
        pool.volume,
        pool.volume_change,
        pool.pool_address,
        token.token_name as token0_name,
        token.logo as token0_logo
      `,
        )
        .leftJoin(
          TokenEntity,
          'token',
          'pool.token0_address = token.contract_address',
        );

      const rawData = await createQuery
        .skip(paging.skip)
        .take(paging.take)
        .getRawMany();

      const totalCount = await createQuery.getCount();

      return {
        rows: plainToClass(GetListPoolResponse, rawData, {
          excludeExtraneousValues: true,
        }),
        totalCount: totalCount,
        nextPage: rawData.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailPool(dataQuery: getDetailPoolDto) {
    try {
      const createQuery = getRepository(PoolEntity)
        .createQueryBuilder('pool')
        .where(
          'pool.token0_address = :token0Address AND pool.token1_address = :token1Address',
          {
            token0Address: dataQuery.token0,
            token1Address: dataQuery.token1,
          },
        );
      /// addWhere Conditions
      const rawData = await createQuery.getOne();

      return rawData;
    } catch (error) {
      throw new HttpException(error?.response, HttpStatus.BAD_REQUEST);
    }
  }
}
