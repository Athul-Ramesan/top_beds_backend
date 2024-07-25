import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schema/bookings.model';
import { BookingService } from './booking/booking.service';

@Injectable()
export class BookingCleanupService {
  constructor(
    @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,
    private bookingService: BookingService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const expiredHolds = await this.BookingModel.find({
      bookingStatus: 'TemporaryHold',
      holdExpiresAt: { $lt: new Date() }
    });
    console.log('cron running')
    for (const hold of expiredHolds) {
        const bookingId:string = String(hold._id)
      await this.bookingService.releaseTemporaryHold(bookingId);
    }
  }
}