import { Document, Types } from 'mongoose';

export interface IBooking extends Document {
  property: Types.ObjectId;
  user: Types.ObjectId;
  guests: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid';
  paymentIntentId?: string;
  bookingStatus: 'Pending' | 'Accepted';
  createdAt: Date;
  updatedAt: Date;
}
