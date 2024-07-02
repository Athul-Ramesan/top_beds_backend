import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schema/review.model';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewService {

    constructor(
        @InjectModel(Review.name ) private  reviewModel:Model<ReviewDocument>
    ){}

    async create(CreateReviewDto:CreateReviewDto):Promise<Review> {
        const createdReview = new this.reviewModel(CreateReviewDto)
        return createdReview.save()
    }
    async findAll():Promise<Review[]>{
        const reviews = await this.reviewModel.find()
        return reviews
    }
    async findByListing(listingId:string):Promise<Review[]>{

        return this.reviewModel.find({listing:listingId}).exec()
    }

    async getAverageRating(listingId:string):Promise<number>{
        const result = await this.reviewModel.aggregate([
            {$match: {
                listing:listingId
            }},
            {$group: {
                _id: null, averageRating: {$avg: '$rating'}
            }}
        ]);
        return result[0]?.averageRating || 0
    }


}
