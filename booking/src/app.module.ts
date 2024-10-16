import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from './kafka/kafka.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CronModule } from './cron/cron.module';
import { ReviewModule } from './review/review.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule,ConfigService } from '@nestjs/config';



@Module({
  imports: [ 
    // MongooseModule.forRoot(config.urls.mongoUrI),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
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
