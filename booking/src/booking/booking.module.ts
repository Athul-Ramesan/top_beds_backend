import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/schema/bookings.model';
import { Payment, PaymentSchema } from 'src/schema/payment.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Booking.name,
      schema: BookingSchema
    },
    {
      name: Payment.name,
      schema: PaymentSchema
    }
  ])],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule { }
