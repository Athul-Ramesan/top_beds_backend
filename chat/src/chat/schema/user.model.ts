import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document 

@Schema()
class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop()
  phone: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  phone: string;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  password: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ enum: ['male', 'female', 'transgender'] })
  gender: string;

  @Prop({ enum: ['user', 'host', 'admin'], default: 'user' })
  role: string;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isGoogle: boolean;

  @Prop()
  profileImage: string;

  @Prop({ enum: ['accepted', 'rejected', 'requested'] })
  hostStatus: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: Date;

  @Prop([{plan: String ,startDate:Date, expiryDate:Date  ,active:Boolean ,stripeSessionId:String}])
  subscriptions: { plan:String, startDate:Date , expiryDate:Date, active:Boolean , stripeSessionId:String}[];
}

export const UserSchema = SchemaFactory.createForClass(User);