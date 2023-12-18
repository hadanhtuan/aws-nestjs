import { ServiceName } from '@lib/common/enums';
import { errorFormatter } from '@lib/utils/helpers';
import {
  GatewayExceptionFilter,
  GatewayResponseInterceptor,
  TimeoutInterceptor
} from '@lib/utils/middlewares';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { ApiGatewayModule } from './api-gateway.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fingerprint = require('express-fingerprint');

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  const env = configService.get(`services.${ServiceName.API_GATEWAY}`);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'DELETE'],
  });

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new GatewayResponseInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errorFormatter(errors);
        return new BadRequestException([message]);
      },
    }),
  );
  app.useGlobalFilters(new GatewayExceptionFilter());

  app.use(
    Fingerprint({
      parameters: [
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
      ],
    }),
  );

  const documentSetup = new DocumentBuilder()
    .setTitle('Admin-Gateway')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, documentSetup);

  SwaggerModule.setup(configService.get('rootApi'), app, document);

  await app.listen(env.port);

  console.info(`API-Gateway is running on:`, env.port);
}
bootstrap();
