import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SubscriptionPlan extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  validityPeriod: number; // in days

  @Prop({ required: true, min:0, type: Number })
  amount: number;

  @Prop({ type: Number, max:100 })
  discount?: number; // percentage

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive?: boolean;
}

export const SubscriptionPlanSchema = SchemaFactory.createForClass(SubscriptionPlan);