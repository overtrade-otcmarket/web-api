import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filters/bad-request.filter';
// import { QueryFailedFilter } from './filters/query-failed.filter';
import { AllExceptionsFilter } from './filters/error-handler.filter';
// import { microserviceConfig } from './microserviceConfig';
import { TransformInterceptor } from './utils/commonFuntion/responseHandler/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // app.connectMicroservice(microserviceConfig);

  // const enableCors = configService.get<boolean>('ENABLE_CORS');
  const port = configService.get<number>('DATABASE_PORT');

  app.enableCors({
    origin: '*',
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter),
    // new HttpExceptionFilter(reflector),
    // new QueryFailedFilter(reflector),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //If set to true validator will strip validated object of any properties that do not have any decorators.
      transform: true, //The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. To enable auto-transformation, set transform to true.
      forbidNonWhitelisted: true, //If set to true, instead of stripping non-whitelisted properties validator will throw an error
      // transformOptions: {
      //   enableImplicitConversion: true, //If set to true class-transformer will attempt conversion based on TS reflected type
      // },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder() //SWAGGER
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        in: 'Header',
      },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); //localhost:3000/docs | localhost:8080/docs to get info of the API
  // app.startAllMicroservices();
  const server = await app.listen(port || 3000);
  server.setTimeout(10 * 60 * 1000);
}
bootstrap();
