import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/schema/bookings.model';

@Injectable()
export class BookingService {
    constructor(@InjectModel(Booking.name) private BookingModel:Model<BookingDocument>){}

    getBooking(){
        const newName = 'athul'
        return newName
    }
}
