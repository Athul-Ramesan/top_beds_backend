import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    BookingModule,
    SubscriptionModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    KafkaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[()=>require('./config')]
    }),
    SubscriptionModule
  ]
})
export class AppModule {}
