import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PoolController } from './controller/pool.controller';
import { PoolService } from './service/pool.service';
import { PoolEntity } from 'src/entities/pool.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([PoolEntity]),
    MinioClientModule,
  ],
  controllers: [PoolController],
  providers: [PoolService, JwtStrategy],
  exports: [PoolService],
})
export class PoolModule {}
