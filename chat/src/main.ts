import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const CLIENT_URL = configService.get<string>('CLIENT_URL')
  app.enableCors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  const PORT = configService.get<number>('PORT')
  await app.listen(PORT);
}
bootstrap();

