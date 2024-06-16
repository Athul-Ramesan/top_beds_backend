import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true })
  booking: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'inr' })
  currency: string;

  @Prop({ required: true })
  paymentIntentId: string;

  @Prop({ type: String, enum: ['Succeeded', 'Failed', 'Pending'], default: 'Pending' })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
