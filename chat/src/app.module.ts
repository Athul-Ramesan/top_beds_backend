import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { KafkaModule } from './kafka/kafka.module';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot(config.urls.mongoUri),
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[()=>require('./config')]
    }),
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
