import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from './subscription/subscription.module';
import { CronModule } from './cron/cron.module';
import { ReviewModule } from './review/review.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardModule } from './dashboard/dashboard.module';
import config from './config';



@Module({
  imports: [ 
    MongooseModule.forRoot(config.urls.mongoUrI),
    BookingModule,
    KafkaModule,
    CronModule,
    SubscriptionModule,
    ReviewModule,
    DashboardModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[()=>require('./config')]
    }),
  ],
})
export class AppModule {}
