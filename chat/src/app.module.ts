import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
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
