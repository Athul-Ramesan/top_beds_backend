import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';

@Module({
  imports: [
    BookingModule,
    MongooseModule.forRoot(MONGO_CONNECTION)
  ]
})
export class AppModule {}
