import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Query, Req, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { makePaymentDto } from 'src/dto/makePaymentDto';
import stripe from 'stripe';


@Controller('')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }

    // @Get('get')
    // async getBooking(@Res()res){
    //     console.log('inside getbooking')
    //     const name = await this.bookingService.getBooking()
    //     console.log("🚀 ~ BookingController ~ getBooking ~ name:", name)
    //     res.status(HttpStatus.OK).json(name)
    // }
    @Post('make-payment-session')
    async makePaymentSession(
        @Query() makePaymentDto: makePaymentDto,
        @Res() res
    ) {
        const { property, price, nights, startDate, endDate, guests } = makePaymentDto
        console.log("🚀 ~ BookingController ~ endDate:", endDate)
        console.log("🚀 ~ BookingController ~ startDate:", startDate)
        const totalAmount = price * nights
        const stripeInstance = new stripe(String(process.env.STRIPE_SECRET))
        console.log(process.env.STRIPE_SECRET, 'api keyyyy secret')

        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
            throw new Error('invalid date format')
        }

        try {
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
        } catch (err: any) {
            console.log("🚀 ~ BookingController ~ err:", err.message)
            if (err.message === 'Property is not available for the selected dates') {
                res.status(400).json({ message: err.message })
            }
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'something went wrong configuring stripe' })
            console.log("🚀 ~ BookingController ~ err:", err)
        }
    }
}
