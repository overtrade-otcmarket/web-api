import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';

@ApiTags('upload') // put the name of the controller in swagger
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload' })
  @Post('upload-files')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  uploadFiles(
    @UploadedFiles()
    files: { images?: Express.Multer.File[] },
    @Body() body,
  ) {
    return this.uploadService.uploadSingle(files.images[0]);
  }

  @Post('upload-redis')
  redisUpload(@Body() body) {
    return this.uploadService.redisUpload(body.key);
  }
}
