import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TokenEntity } from 'src/entities/token.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([AccountEntity, TokenEntity]),
    MinioClientModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
