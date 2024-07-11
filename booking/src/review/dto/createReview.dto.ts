// create-review.dto.ts
import { IsNotEmpty, IsNumber, IsString, Min, Max, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  user: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  listing: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  bookingId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}