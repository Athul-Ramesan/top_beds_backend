import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './subscription/subscription.module';
import { HttpModule } from '@nestjs/axios';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';


@Module({
  imports: [ 
    MongooseModule.forRoot(MONGO_CONNECTION),
    BookingModule,
    KafkaModule,
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[()=>require('./config')]
    }),
    SubscriptionModule,
  ],
})
export class AppModule {}
