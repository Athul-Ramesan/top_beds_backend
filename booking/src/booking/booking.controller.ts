import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { makePaymentDto } from 'src/dto/makePaymentDto';
import stripe from 'stripe';

@Controller()
export class BookingController {
    constructor (
        private readonly bookingService: BookingService
    ){}

    // @Get('get')
    // async getBooking(@Res()res){
    //     console.log('inside getbooking')
    //     const name = await this.bookingService.getBooking()
    //     console.log("🚀 ~ BookingController ~ getBooking ~ name:", name)
    //     res.status(HttpStatus.OK).json(name)
    // }
    @Post('make-payment-session')
    async makePaymentSession(
        @Body()makePaymentDto: makePaymentDto,
        @Res() res
     ){
        const {property ,price, nights} = makePaymentDto
        const totalAmount = price*nights
        const stripeInstance = new stripe(String(process.env.STRIPE_SECRET))
        console.log(process.env.STRIPE_SECRET,'api keyyyy secret')
            try{
            const lineItems = [{
                price_data: {
                    currency:'inr',
                    product_data:{
                        name: property?.title,
                        images:[property.images[0], property.images[1],property.images[2]]
                    },
                    unit_amount: Math.floor(totalAmount * 100), 
                },
                quantity:1
            }]


            const session = await stripeInstance.checkout.sessions.create({
                payment_method_types:['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:5173/index/paymentSuccess',
                cancel_url:"http://localhost:5173/index/paymentSuccess"
            })
            console.log("🚀 ~ BookingController ~ session:", session)
            console.log(makePaymentDto)
           res.status(200).json({id:session.id})
        }catch(err:any){
        console.log("🚀 ~ BookingController ~ err:", err)

        }
    }
}
