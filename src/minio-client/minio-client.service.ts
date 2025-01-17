import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = process.env.MINIO_BUCKET;

  constructor(
    private readonly minio: MinioService,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    directPath: string,
    fileName: string,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      //   throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
      // }
      const temp_filename = Date.now().toString();
      const hashedFileName = crypto
        .createHash('md5')
        .update(temp_filename)
        .digest('hex');
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
      );
      const metaData: any = {
        'Content-Type': file.mimetype,
      };
      const filename = `/${directPath}/` + hashedFileName + ext;
      const initfileName = `${filename}`;

      const fileBuffer = Buffer.from(file.buffer['data']);

      await this.minio.client.putObject(
        baseBucket,
        fileName && fileName != ''
          ? `/${directPath}/${fileName}`
          : initfileName,
        fileBuffer,
        metaData,
      );

      return {
        url: `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${
          process.env.MINIO_BUCKET
        }/${directPath}/${
          fileName && fileName != '' ? fileName : initfileName
        }`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  public async uploadUri(
    fileName,
    data,
    directPath: string,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      const metaData: any = {
        'Content-Type': 'application/json',
      };

      this.minio.client.putObject(
        baseBucket,
        `/${directPath}/${fileName}`,
        JSON.stringify(data),
        metaData,
      );

      return {
        url: `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${directPath}/${fileName}`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  public async uploadAPI(
    file: BufferedFile,
    directPath: string,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      //   throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
      // }
      const temp_filename = Date.now().toString();
      const hashedFileName = crypto
        .createHash('md5')
        .update(temp_filename)
        .digest('hex');
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
      );
      const metaData: any = {
        'Content-Type': file.mimetype,
      };
      const filename = hashedFileName + ext;
      const initfileName = `/${directPath}/${filename}`;
      const fileBuffer = file.buffer;

      const upload = await this.minio.client.putObject(
        baseBucket,
        initfileName,
        fileBuffer,
        metaData,
      );

      return {
        url: `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}${initfileName}`,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response || 'Error uploading file',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async uploadSingle(
    file: BufferedFile,
    directPath: string,
    fileName: string,
    baseBucket: string = this.baseBucket,
  ) {
    try {
      // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      //   throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
      // }
      const temp_filename = Date.now().toString();
      const hashedFileName = crypto
        .createHash('md5')
        .update(temp_filename)
        .digest('hex');
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
      );
      const metaData: any = {
        'Content-Type': file.mimetype,
      };
      const filename = `/${directPath}/` + hashedFileName + ext;
      const initfileName = `${filename}`;

      const fileBuffer = file.buffer;

      await this.minio.client.putObject(
        baseBucket,
        fileName && fileName != ''
          ? `/${directPath}/${fileName}`
          : initfileName,
        fileBuffer,
        metaData,
      );

      return {
        url: `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${
          process.env.MINIO_BUCKET
        }/${directPath}/${
          fileName && fileName != '' ? fileName : initfileName
        }`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    try {
      this.minio.client.removeObject(baseBucket, objetName);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async downloadAndUploadImage(imageUrl: string, objectName: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(imageUrl, { responseType: 'arraybuffer' }),
      );
      const res = await this.minio.client.putObject(
        this.baseBucket,
        objectName,
        Buffer.from(response.data),
        {
          'Content-Type': response.headers['content-type'],
        } as any,
      );
      return `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${objectName}`;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  async parseAndUploadImage(imageBase64: string, objectName: string) {
    try {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');
      const mimeTypeMatch = imageBase64.match(/data:(image\/\w+);base64,/);
      const res = await this.minio.client.putObject(
        this.baseBucket,
        objectName,
        imageBuffer,
        {
          'Content-Type': 'image/png',
        } as any,
      );
      return `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${objectName}`;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}
