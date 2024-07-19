import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Query, Req, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { makePaymentDto } from 'src/dto/makePaymentDto';
import stripe from 'stripe';
import { Booking } from 'src/schema/bookings.model';


@Controller('api/booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }

    @Post('make-payment-session/:userId')
    async makePaymentSession(
        @Param() user: { userId: string },
        @Body() makePaymentDto: makePaymentDto,
        @Res() res

    ) {
        const { userId } = user
        console.log("🚀 ~ BookingController ~ userId:", userId)
        console.log(makePaymentDto, 'req.bodyyyyyyyyyyyyyy')

        if (!makePaymentDto) {
            throw new NotFoundException("no data given");
        }
        const { property, price, nights, startDate, endDate, guests } = makePaymentDto
        console.log("🚀 ~ BookingController ~ endDate:", endDate)
        console.log("🚀 ~ BookingController ~ startDate:", startDate)
        const totalAmount = price * nights
        const stripeInstance = new stripe(String(process.env.STRIPE_SECRET))
        console.log(process.env.STRIPE_SECRET, 'api keyyyy secret')


        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);


        const lineItems = [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: property?.title,
                    images: [property.images[0], property.images[1], property.images[2]]
                },
                unit_amount: Math.floor(totalAmount * 100),
            },
            quantity: 1
        }]


        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://topbeds.vercel.app/index/paymentSuccess/{CHECKOUT_SESSION_ID}',
            cancel_url: "http://topbeds.vercel.app/index/paymentSuccess"
        })
        console.log("🚀 ~ BookingController ~ session:", session)
        let booking: any = {}
        if (session.id) {
            booking = await this.bookingService.createBooking(
                userId,
                property._id,
                newStartDate,
                newEndDate,
                guests,
                totalAmount,

            )
            console.log("🚀 ~ BookingController ~ booking:", booking)
            if (!booking) {
                throw new Error('Failed to create booking');
            }

        }
        console.log(makePaymentDto)
        console.log(booking)
        res.status(200).json({ message: "OK", id: session.id, bookingId: booking._id })
    }
    @Post('confirm')
    async confirmBooking(
        @Body() confirmBookingData,
        @Res() res
    ) {
        console.log(confirmBookingData)
        return this.bookingService.confirmBooking(confirmBookingData)
    }

    @Get('payment-session-status/:sessionId')
    async getSessionStatus(@Param('sessionId') sessionId: string) {
        console.log("🚀 ~ SubscriptionController ~ getSessionStatus ~ sessionId:", sessionId)
        return this.bookingService.getSessionStatus(sessionId);
    }
    @Get('user/:userId')
    async getUserBookings(@Param('userId') userId: string) {
      return this.bookingService.getUserBookings(userId);
    }
  
    @Get('host/:hostId')
    async getHostBookings(@Param('hostId') hostId: string) {
      return this.bookingService.getHostBookings(hostId);
    }
    @Get(':bookingId')
    async getBooking(@Param('bookingId') bookingId: string) {
    console.log("🚀 ~ BookingController ~ getBooking ~ bookingId:🥶🥶🥶🥶🥶", bookingId)

        
      return this.bookingService.getBookingById(bookingId.trim());
    }

  @Post('cancel/:bookingId')
  async cancelBooking(
    @Param('bookingId') bookingId: string,
    @Body('refundPercentage') refundPercentage: number,
  ) {
    console.log("🚀 ~ BookingController ~ refundPercentage:", refundPercentage)
    return this.bookingService.cancelBooking(bookingId, refundPercentage);
  }
    
  
}
