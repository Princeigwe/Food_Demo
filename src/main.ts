import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config as AWS_CONFIG} from 'aws-sdk'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unnecessary properties in POST request body
      transform: true,
    }),
  );

  AWS_CONFIG.update({
    accessKeyId: process.env.FOOD_DEMO_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.FOOD_DEMO_S3_SECRET_ACCESS_KEY
  })

  await app.listen(3000);

}
bootstrap();
