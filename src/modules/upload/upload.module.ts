import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { UploadService } from './services/upload.service';

@Module({
  imports: [MinioClientModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [],
})
export class UploadModule {}
