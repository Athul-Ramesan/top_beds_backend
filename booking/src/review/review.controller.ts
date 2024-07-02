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
        return this.reviewService.findByListing(id)
    }

    @Get('rating/:id')
    getAverageRating(@Param('id') id:string){
        return this.reviewService.getAverageRating(id)
    }

}
