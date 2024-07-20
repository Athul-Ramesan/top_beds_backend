import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schema/review.model';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/createReview.dto';
import { Booking, BookingDocument } from 'src/schema/bookings.model';
import { Property, PropertyDocument } from 'src/schema/property.model';
import { User, UserDocument } from 'src/schema/user.model';

@Injectable()
export class ReviewService {

    constructor(
        @InjectModel(Review.name ) private  reviewModel:Model<ReviewDocument>,
        @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,

        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,

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
        const reviews = await this.reviewModel.find({listing:listingId}).populate('user')
        console.log("🚀 ~ ReviewService ~ findByListing ~ reviews:", reviews)
        return reviews
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
        console.log("🚀 ~ ReviewService ~ getAverageRating ~ result:", result)
        return result[0]?.averageRating || 0
    }
    async findByBookingId(bookingId:string):Promise<Review |null>{
        console.log("🚀 ~ ReviewService ~ findByBookingId ~ bookingId:", bookingId)
        const result = this.reviewModel.findOne({bookingId})
        return result
    }
    async findByUserId (userId:string):Promise<Review[] | null>{
        return this.reviewModel.find({user:userId}).populate('listing')
    }


}
