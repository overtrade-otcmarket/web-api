import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly walletAddress: string;

  @ApiProperty()
  // @IsArray()
  @IsNotEmpty()
  readonly signature: any;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  readonly signData: any;
}

export class PostLoginResponse {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly refreshToken: string;
}

export class GetRefreshResponse {
  @ApiProperty()
  readonly accessToken: string;
}
