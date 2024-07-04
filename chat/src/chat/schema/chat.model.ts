import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.model';
import { Message } from './message.model';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;
  
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
    required: true,
  })
  participants: User[];

  @Prop({
    type: String,
    enum: ['individual', 'group'],
    default: 'individual',
  })
  type: string;

  @Prop({
    type: String,
    enum: ['requested', 'active', 'block'],
    default: 'requested',
  })
  status: string;

//   @Prop()
//   groupName?: string;

//   @Prop()
//   groupId?: string;

  @Prop([{
    participant: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
    seenAt: { type: Date, default: Date.now },
  }])
  lastSeen: { participant: User; seenAt: Date }[];

//   @Prop()
//   groupDescription?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }] })
  messages: Message[];

  @Prop({type:String,enum: ['requested', 'accepted', 'pending']})
  requestStatus: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);