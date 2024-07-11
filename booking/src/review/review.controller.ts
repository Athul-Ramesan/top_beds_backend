import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';


@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService:ReviewService){}
    @Post()
    create(@Body() createReviewDto:CreateReviewDto){
        console.log("🚀 ~ ReviewController ~ create ~ createReviewDto:", createReviewDto)
        return this.reviewService.create(createReviewDto)
    }
    @Get()
    async findAll(){
        return this.reviewService.findAll();
    }

    @Get('properties/:id')
    findByListing(@Param('id') id:string){
        console.log("🚀 ~ ReviewController ~ findByListing ~ id:", id)
        return this.reviewService.findByListing(id)
    }
    @Get('/booking/:bookingId')
    findByBookingId(@Param('bookingId') bookingId:string){
        return this.reviewService.findByBookingId(bookingId)
    }
    @Get('/user/:userId')
    findByUserId(@Param('userId') userId:string){
        return this.reviewService.findByUserId(userId)
    }

    @Get('rating/:id')
    getAverageRating(@Param('id') id:string){
        console.log("🚀 ~ ReviewController ~ getAverageRating ~ id:", id)
        return this.reviewService.getAverageRating(id)
    }

  

}
