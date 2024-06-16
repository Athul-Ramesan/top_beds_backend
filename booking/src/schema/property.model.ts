import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema()
export class Property {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: {
      address: String,
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  })
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  hostId: mongoose.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }])
  reviews: mongoose.Types.ObjectId[];

  @Prop([{ startDate: Date, endDate: Date, available: Boolean }])
  availability: { startDate: Date; endDate: Date; available: boolean }[];

  @Prop({ default: false })
  active: boolean;

  @Prop([String])
  amenities: string[];

  @Prop([String])
  houseRules: string[];

  @Prop(Number)
  price: number;

  @Prop([String])
  images: string[];

  @Prop(Number)
  bedrooms: number;

  @Prop(Number)
  bathrooms: number;

  @Prop(Number)
  maxGuests: number;

  @Prop({ type: String, enum: ['House', 'Resort', 'Cabin', 'Apartment'] })
  category: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
