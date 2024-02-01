import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const expressApp = new ExpressAdapter();
  expressApp.enableCors({
    origin: 'http://localhost:4200', // Angular address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('APPLICATION_PORT');

  await app.listen(port);
}
bootstrap();
