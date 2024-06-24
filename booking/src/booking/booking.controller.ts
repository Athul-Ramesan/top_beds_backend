import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Query, Req, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { makePaymentDto } from 'src/dto/makePaymentDto';
import stripe from 'stripe';


@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }

    @Post('make-payment-session')
    async makePaymentSession(
        @Body() makePaymentDto: makePaymentDto,
        @Res() res

    ) {

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
            success_url: 'http://localhost:5173/index/paymentSuccess',
            cancel_url: "http://localhost:5173/index/paymentSuccess"
        })
        console.log("🚀 ~ BookingController ~ session:", session)
        if (session.id) {
            const booking = this.bookingService.createBooking(
                property.hostId,
                property._id,
                newStartDate,
                newEndDate,
                guests,
                totalAmount
            )
            console.log("🚀 ~ BookingController ~ booking:", booking)
            if (!booking) {
                throw new Error('Failed to create booking');
            }

        }
        console.log(makePaymentDto)
        res.status(200).json({ id: session.id })

    }
}
