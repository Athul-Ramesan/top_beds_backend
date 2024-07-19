import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/schema/bookings.model';
import { Payment, PaymentSchema } from 'src/schema/payment.model';
import { Property, PropertySchema } from 'src/schema/property.model';
import { User, UserSchema } from 'src/schema/user.model';
import { HttpModule } from '@nestjs/axios';
import { MailerService } from 'src/mailer.service';
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Booking.name,
      schema: BookingSchema
    },
    {
      name: Payment.name,
      schema: PaymentSchema
    },
    {
      name:Property.name,
      schema:PropertySchema
    },
    {
      name:User.name,
      schema:UserSchema
    }
  ]),
  HttpModule
],
  providers: [BookingService, MailerService],
  controllers: [BookingController]
})
export class BookingModule { }

