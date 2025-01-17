import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersEntity } from 'src/entities/orders.entity';
import { OrdersActivityEntity } from 'src/entities/order_activity.entity';
import { TokenEntity } from 'src/entities/token.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([OrdersEntity, OrdersActivityEntity, TokenEntity]),
    MinioClientModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy],
  exports: [OrdersService],
})
export class OrdersModule {}
