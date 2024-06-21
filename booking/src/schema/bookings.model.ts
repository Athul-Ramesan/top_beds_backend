import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({timestamps:true})
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true })
  property: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({require:true})
  guests: number

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: String, enum: ['Pending', 'Paid'], default: 'Pending' })
  paymentStatus: string;

  @Prop()
  paymentIntentId: string;


}

export const BookingSchema = SchemaFactory.createForClass(Booking);
