import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.model';
import { Property, PropertySchema } from 'src/schema/property.model';
import { Booking, BookingSchema } from 'src/schema/bookings.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name:Property.name,
      schema: PropertySchema
    },
    {
      name:Booking.name,
      schema: BookingSchema
    }
  ])],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
