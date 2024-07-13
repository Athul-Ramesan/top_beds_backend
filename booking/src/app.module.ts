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
    MongooseModule.forRoot("mongodb+srv://athulrameshankvar:d4upSfgpmb2VuR4@cluster0.n4mjixy.mongodb.net/"),
    BookingModule,
    KafkaModule,
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[()=>require('./config')]
    }),
    SubscriptionModule,
    ReviewModule,
    DashboardModule,
  ],
})
export class AppModule {}
