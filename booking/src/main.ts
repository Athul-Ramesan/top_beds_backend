import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import config from './config';

async function bootstrap() {
  

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: config.urls.clientURL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  app.use(cookieParser())
  dotenv.config()
  await app.listen(config.Port.booking);
}


bootstrap();

