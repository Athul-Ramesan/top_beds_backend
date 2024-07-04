import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Chat', required: true })
  chat: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  receiver: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ enum: ['text', 'image', 'video', 'audio'], default: 'text' })
  contentType: string;

  @Prop({ default: false })
  receiverSeen: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);