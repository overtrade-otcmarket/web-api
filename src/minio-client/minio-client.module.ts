import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    MinioModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: config.get('MINIO_ENDPOINT'),
          port: parseInt(config.get('MINIO_PORT')),
          useSSL: true,
          accessKey: config.get('MINIO_ACCESSKEY'),
          secretKey: config.get('MINIO_SECRETKEY'),
        };
      },
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
