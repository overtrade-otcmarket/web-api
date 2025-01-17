import { Inject, Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UploadService {
  constructor(
    private minioClientService: MinioClientService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async uploadSingle(image: BufferedFile) {
    const directPath = 'upload-test';
    const uploaded_image = await this.minioClientService.uploadAPI(
      image,
      directPath,
    );

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }

  async uploadMany(files: BufferedFile, directPath: string) {
    const image1 = files['image1'][0];
    const uploaded_image1 = await this.minioClientService.upload(
      image1,
      directPath,
      '',
    );

    const image2 = files['image2'][0];
    const uploaded_image2 = await this.minioClientService.upload(
      image2,
      directPath,
      '',
    );

    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3',
    };
  }

  async redisUpload(key) {
    const getCache: any = await this.cacheManager.get(key);
    console.log('getCache :>> ', getCache);
    return JSON.parse(getCache);
  }
}
