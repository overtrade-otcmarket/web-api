import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { HttpModule } from '@nestjs/axios';
import { TokenEntity } from 'src/entities/token.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    HttpModule,
    MinioClientModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
