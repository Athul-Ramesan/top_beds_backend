import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schema/review.model';
import { Booking, BookingSchema } from 'src/schema/bookings.model';
import { User, UserSchema } from 'src/schema/user.model';
import { Property, PropertySchema } from 'src/schema/property.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Review.name,
      schema: ReviewSchema
    },
    {
      name: Booking.name,
      schema: BookingSchema
    },
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name: Property.name,
      schema: PropertySchema
    },
  ])
],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
