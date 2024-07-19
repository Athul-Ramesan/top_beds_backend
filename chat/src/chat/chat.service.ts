// chat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Chat, ChatDocument } from './schema/chat.model';
import { Message, MessageDocument } from './schema/message.model';
import { User, UserDocument } from './schema/user.model';
import { CreateMessageDto } from './dto/createMessageDto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(createChatDto: any, newMessageDto: any) {
    console.log("🚀 ~ ChatService ~ create ~ newMessageDto:", newMessageDto)
    let chat = await this.chatModel.findOne({
      participants: { $all: createChatDto.participants }
    });
    console.log("🚀 ~ ChatService ~ create ~ chat:", chat)

    if (!chat) {
      chat = new this.chatModel(createChatDto);
      await chat.save();
    }

    const message = new this.messageModel(newMessageDto);
    message.chatId = chat._id as ObjectId
    console.log("🚀 ~ ChatService ~ create ~ message:", message)
    await message.save();

    chat.messages.push(message._id as Types.ObjectId);
    await chat.save();

    return chat.populate('messages');
  }

  async getChatsBySender(senderId: string) {
    const result = await this.chatModel.find({ participants: senderId })
      .populate('participants')
      .populate({
        path: 'messages',
        populate: [
          { path: 'sender', },  
          { path: 'receiver', }
        ],
      })
      .sort({ 'messages.createdAt': -1 });
    console.log("🚀 ~ ChatService ~ getChatsBySender ~ result:", result)
    return result
  }

  async sendMessage(messageData: CreateMessageDto) {
    console.log("🚀 ~ ChatService ~ sendMessage ~ messageData:", messageData)
    const message = new this.messageModel(messageData);
    await message.save();
    
    let chat = await this.chatModel.findOne({
      participants: { $all: [messageData.receiver, ,messageData.sender] }
    });
    if(messageData.chatId){
      chat = await this.chatModel.findById(messageData.chatId)
    }

  //   const participants= [messageData.receiver, ,messageData.sender] 
  //   const createChatDto = {
  //     participants
  // }
  //   if(!chat){
  //     return this.create(createChatDto,messageData)
  //   }
    console.log("🚀 ~ ChatService ~ sendMessage ~ chat:", chat)
    chat.messages.push(message._id as Types.ObjectId);
    await chat.save();
    const checkingChat = await this.chatModel.findById(messageData.chatId);
    console.log(checkingChat, 'checking chatttt')
    return message.populate('sender receiver');
  }

  async markMessagesSeen(chatId: string, userId: string) {
    await this.messageModel.updateMany(
      { chat: chatId, receiver: userId, receiverSeen: false },
      { $set: { receiverSeen: true } }
    );
  }

  async getSenderDetails(senderId: string) {
    return this.userModel.findById(senderId);
  }

  //user 

  async updateUserData(_id:string, payload:any){
    console.log("🚀 ~ ChatService ~ updateUserData ~ _id:", _id)
    console.log("🚀 ~ ChatService ~ updateUserData ~ payload:", payload)
    
    return this.userModel.findByIdAndUpdate(_id, payload, {new: true})
  }
  async createUser (userData:UserDocument){
    return this.userModel.create(userData)
  }
}