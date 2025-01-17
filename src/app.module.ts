import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-ioredis-yet';
import * as Joi from 'joi';
import config from './config';
import { TestConsumer } from './consmer';
import { environments } from './environments';
import { KafkaModule } from './kafka/kafka.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ActivityModule } from './modules/activity/activity.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { TokenModule } from './modules/token/token.module';
// import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';
import { PoolModule } from './modules/pool/pool.module';
import { OrdersModule } from './modules/orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true, //when true, stops validation on the first error, otherwise returns all the errors found. Defaults to true.
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.postgres.host,
          port: configService.postgres.port,
          database: configService.postgres.name,
          username: configService.postgres.user,
          password: configService.postgres.password,
          autoLoadEntities: true,
          keepConnectionAlive: true,
        };
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        })) as unknown as CacheStore,
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    TokenModule,
    HealthModule,
    ActivityModule,
    PoolModule,
    OrdersModule,
    // KafkaModule,
    // UploadModule,
    // MinioClientModule,
    HttpModule,
  ],
  controllers: [],
  // providers: [TestConsumer],
})
export class AppModule {}
