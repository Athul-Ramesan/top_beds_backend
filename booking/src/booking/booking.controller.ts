import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor (
        private readonly bookingService: BookingService
    ){}

    @Get()
    async getBooking(@Res()res){
        const name = this.bookingService.getBooking()

        res.status(HttpStatus.OK).json(name)
    }
}
