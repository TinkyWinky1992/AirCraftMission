import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.use(express.json());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5000);
}
bootstrap();