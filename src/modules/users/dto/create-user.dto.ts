import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../auth/models/roles.model';
import { GenerateImageModelEnum } from 'src/utils/enum';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}

export class CreateAdminDto extends CreateUserDto {
  @ApiProperty()
  @IsEnum(Role)
  readonly role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class DefaultColumnsResponse extends CreateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly role: Role;
}

export class UserCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly tokenAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly image: string;
}

export class UpdateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
}

export class GenerateImageDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsEnum(GenerateImageModelEnum)
  @IsNotEmpty()
  model: GenerateImageModelEnum;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class getUserOrdersDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  token0: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  token1: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  searchBy: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  filter: string;
}

export class getUserTransactionsDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  limit: number;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  token0: string;

  @IsOptional()
  @ApiProperty({ type: String, required: false })
  token1: string;
}
