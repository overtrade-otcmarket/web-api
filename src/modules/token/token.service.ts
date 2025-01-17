import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { async, firstValueFrom } from 'rxjs';
import { Brackets, Repository } from 'typeorm';
import { ImportTokenDto } from './dto/import-token.dto';
import { TokenEntity } from 'src/entities/token.entity';
import { GetAllTokenDto, QuoteTokenDto } from './dto/get-all-tokens.dto';
import Paging from 'src/utils/commonFuntion/paging';
import { MinioClientService } from 'src/minio-client/minio-client.service';
@Injectable()
export class TokenService {
  private readonly dexscreenerApiUrl: string;
  private readonly pragmaApiUrl: string;
  private readonly pragmaApiKey: string;
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private minioClientService: MinioClientService,
  ) {
    this.dexscreenerApiUrl =
      this.configService.get<string>('DEXSCREEN_API_URL');
    this.pragmaApiUrl = this.configService.get<string>('PRAGMA_API_URL');
    this.pragmaApiKey = this.configService.get<string>('PRAGMA_API_KEY');
  }

  async getListToken(query: GetAllTokenDto) {
    try {
      const paging = Paging(query?.page || 1, query.limit || 10);
      const dataQuery = this.tokenRepository.createQueryBuilder('token');
      if (query.search) {
        dataQuery.where(
          new Brackets((qb) => {
            qb.where('token.tokenName ILIKE :search', {
              search: `%${query.search}%`,
            })
              .orWhere('token.tokenSymbol ILIKE :search', {
                search: `%${query.search}%`,
              })
              .orWhere('token.contractAddress ILIKE :search', {
                search: `%${query.search}%`,
              });
          }),
        );
      }

      if (query.sortField) {
        dataQuery.orderBy(`token.${query.sortField}`, query.orderBy);
      } else {
        dataQuery.orderBy('token.createdAt', 'DESC');
      }

      dataQuery.skip(paging.skip).take(paging.take);

      const data = await dataQuery.getMany();

      return {
        rows: data.map((item) => ({ ...item, available: true })),
        nextPage: data.length < paging.take ? false : true,
      };
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async quoteToken(query: QuoteTokenDto) {
    try {
      if (query.search) {
        const res = await firstValueFrom(
          this.httpService.get(
            `${this.dexscreenerApiUrl}/latest/dex/search?q=${query.search}`,
          ),
        );
        const { data } = res;
        const filterInfo = data?.pairs?.filter(
          (pair: any) => pair?.chainId === 'starknet',
        );

        const formatData = filterInfo.map((pair: any) => ({
          tokenName: pair?.baseToken?.name,
          tokenSymbol: pair?.baseToken?.symbol,
          contractAddress: pair?.baseToken?.address,
          decimal: 18,
          logo: pair?.info?.imageUrl,
          priceInUsd: pair.priceUsd,
        }));
        const tokenInDd = await this.getListToken({
          page: 1,
          limit: 999,
        });

        const finalData = formatData.map((data: any) => {
          const checkExist = !!tokenInDd.rows.find(
            (token) => token.contractAddress === data?.contractAddress,
          );
          if (checkExist) return { ...data, available: true };
          else return { ...data, available: false };
        });
        const unique = [
          ...new Map(
            finalData.map((obj) => [obj.contractAddress, obj]),
          ).values(),
        ];
        return {
          rows: unique,
        };
      } else {
        return await this.getListToken({ limit: 999, page: 1 });
      }
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getTokenDetail(tokenAddress: string) {
    try {
      const token = await this.tokenRepository.findOne({
        contractAddress: tokenAddress,
      });
      if (token) {
        const res: any = await this.getTokenPrice(tokenAddress);
        return { ...token, priceInUsd: res?.priceInUsd };
      } else throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getTokenInfoFromDex(tokenAddress: string) {
    try {
      const cacheKey = `otc-token-${tokenAddress}`;
      const cacheValue = await this.cacheManager.get(cacheKey);
      if (cacheValue) {
        return cacheValue;
      } else {
        const res = await firstValueFrom(
          this.httpService.get(
            `${this.dexscreenerApiUrl}/latest/dex/tokens/${tokenAddress}`,
          ),
        );
        if (res.data?.pairs) {
          const pair = res.data?.pairs[0];
          const formatData = {
            tokenName: pair?.baseToken?.name,
            tokenSymbol: pair?.baseToken?.symbol,
            contractAddress: pair?.baseToken?.address,
            decimal: 18,
            logo: pair?.info?.imageUrl,
            websiteUrl: pair?.info?.websites?.[0]?.url,
            discordUrl: pair?.info?.socials?.filter(
              (el: any) => el?.type === 'discord',
            )?.url,
            telegramUrl: pair?.info?.socials?.filter(
              (el: any) => el?.type === 'telegram',
            )?.url,
            twitterUrl: pair?.info?.socials?.filter(
              (el: any) => el?.type === 'twitter',
            )?.url,
          };
          await this.cacheManager.set(cacheKey, formatData, 86400000);
          return formatData;
        } else return null;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async importToken(user: any, body: ImportTokenDto) {
    try {
      const token = await this.tokenRepository.findOne({
        contractAddress: body.tokenAddress,
      });
      if (token) {
        throw new HttpException(
          'Token already imported',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const tokenInfo: any = await this.getTokenInfoFromDex(
          body.tokenAddress,
        );
        let logo: string;
        if (tokenInfo?.logo) {
          logo = await this.minioClientService.downloadAndUploadImage(
            tokenInfo?.logo,
            `token-logo/${body.tokenAddress}`,
          );
        }
        const newToken = await this.tokenRepository.save({
          contractAddress: body.tokenAddress,
          tokenName: tokenInfo?.tokenName,
          tokenSymbol: tokenInfo?.tokenSymbol,
          decimal: 18,
          logo: logo || '',
          creatorAddress: user.walletAddress,
          websiteUrl: tokenInfo?.websiteUrl,
          discordUrl: tokenInfo?.discordUrl,
          twitterUrl: tokenInfo?.twitterUrl,
          telegramUrl: tokenInfo?.telegramUrl,
        });
        return newToken;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getStrkPrice() {
    try {
      const cacheKey = 'otc-strk-price';
      const cacheValue = await this.cacheManager.get(cacheKey);
      if (cacheValue) return cacheValue;
      else {
        const res = await firstValueFrom(
          this.httpService.get(`${this.pragmaApiUrl}strk/usd?network=mainnet`, {
            headers: {
              'x-api-key': this.pragmaApiKey,
            },
          }),
        );
        const { data } = res;
        const price = Number(data?.price) / Math.pow(10, data?.decimals);
        await this.cacheManager.set(cacheKey, { price }, 300000);
        return { price };
      }
    } catch (error) {
      console.log(error);

      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }

  async getTokenPrice(tokenAddress: string) {
    try {
      const cacheKey = `otc-token-price-${tokenAddress}`;
      const cacheValue = await this.cacheManager.get(cacheKey);
      if (cacheValue) {
        return cacheValue;
      } else {
        const res = await firstValueFrom(
          this.httpService.get(
            `${this.dexscreenerApiUrl}/latest/dex/tokens/${tokenAddress}`,
          ),
        );
        if (res.data?.pairs) {
          const pair = res.data?.pairs[0];

          const formatData = {
            priceInUsd: pair?.priceUsd,
          };
          await this.cacheManager.set(cacheKey, formatData, 360000);
          return formatData;
        }
        return { priceInUsd: 0 };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    }
  }
}
