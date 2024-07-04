import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.model';
import { Message } from './message.model';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }]
  })
  participants: User[];

  @Prop([{
    participant: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
    seenAt: { type: Date, default: Date.now },
  }])
  lastSeen: { participant: User; seenAt: Date }[];


  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];

  @Prop({type:String,enum: ['requested', 'accepted', 'pending']})
  requestStatus: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);