import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import {
  CollectionActivitySearchTypeEnum,
  CollectionActivityTypeEnum,
} from 'src/utils/enum';

export class GetActivityDto {
  @ValidateIf(
    (searchType) =>
      searchType.searchBy !== CollectionActivitySearchTypeEnum.USER,
  )
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEnum(CollectionActivitySearchTypeEnum)
  searchBy: CollectionActivitySearchTypeEnum;

  @IsOptional()
  @IsArray()
  @IsEnum(CollectionActivityTypeEnum, { each: true })
  activityType?: number[];

  @ValidateIf(
    (searchType) =>
      searchType.searchBy === CollectionActivitySearchTypeEnum.USER,
  )
  @IsNotEmpty()
  userAddress?: string;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  network: number;
}

export class GetActivityMultipleNftDto {
  @IsString()
  collectionAddress: string;

  @IsString()
  title: string;

  @IsString()
  baseUri: string;

  @IsOptional()
  @IsArray()
  @IsEnum(CollectionActivityTypeEnum, { each: true })
  activityType?: number[];
}
