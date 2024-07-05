import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schema/chat.model';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schema/user.model';
import { Message, MessageDocument } from './schema/message.model';
import { CreateMessageDto } from './dto/createMessageDto';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,

    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,){}


    async getChatBetweenParticipants(senderId:string, receiverId:string):Promise<ChatDocument | null>{
        console.log("🚀 ~ ChatService ~ getChatBetweenParticipants ~ receiverId:", receiverId)
        console.log("🚀 ~ ChatService ~ getChatBetweenParticipants ~ senderId:", senderId)
        const senderObjectId = new Types.ObjectId(senderId);
        const receiverObjectId = new Types.ObjectId(receiverId);
        const existingChat = await this.chatModel.findOne({
            participants: {
                $all: [
                    {$elemMatch:{$eq: senderObjectId}},
                    {$elemMatch:{$eq: receiverObjectId}}
                ]
            }
        })
        console.log("🚀 ~ ChatService ~ getChatBetweenParticipants ~ existingChat:", existingChat)
        return existingChat
    }

    async create(createChatDto: any, newMessageDto: CreateMessageDto): Promise<Chat> {
        console.log("🚀 ~ ChatService ~ create ~ newMessageDto:", newMessageDto)
        console.log("🚀 ~ ChatService ~ create ~ createChatDto:", createChatDto)
        try {
          const { sender, receiver } = newMessageDto;
          console.log("🚀 ~ ChatService ~ create ~ receiver:", receiver)
          console.log("🚀 ~ ChatService ~ create ~ sender:", sender)
    
          if (!sender || !receiver) {
            throw new BadRequestException('senderId and receiverId are required');
          }
    
          const existingChat = await this.getChatBetweenParticipants(sender, receiver);
          if (existingChat) {
            await this.sendMessage(newMessageDto);
            return existingChat;
          }
    
          const createdChat = new this.chatModel(createChatDto);
          await createdChat.save();
    
          await this.sendMessage(newMessageDto);
    
          return createdChat;
        } catch (error) {
          if (error instanceof BadRequestException) {
            throw error;
          }
          if (error.name === 'ValidationError') {
            throw new BadRequestException(error.message);
          }
          throw new Error(`Failed to create chat: ${error.message}`);
        }
      }
    
    async findAllChat():Promise<Chat[]>{

        return this.chatModel.find()
    }
    async getSenderDetails (senderId:string):Promise<User>{
        return this.userModel.findOne({_id: senderId})
    }

    async createMessage (createMessageDto:CreateMessageDto):Promise<Message>{
        return this.messageModel.create(createMessageDto)
    }

    async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        console.log("🚀 ~ ChatService ~ sendMessage ~ createMessageDto:", createMessageDto)
        try {
          const { sender, receiver,content } = createMessageDto;
    
          if (!sender || !receiver) {
            throw new BadRequestException('Sender and receiver are required');
          }
    
          const chat = await this.getChatBetweenParticipants(sender, receiver);
          if (!chat) {
            throw new NotFoundException('Chat not found between the participants');
          }
    
          const messageToSave = new this.messageModel(createMessageDto);
          const savedMessage = await messageToSave.save();
          console.log("🚀 ~ ChatService ~ sendMessage ~ savedMessage:", savedMessage)
    
          chat.messages.push(savedMessage._id as Types.ObjectId);
          await chat.save();
    
          return savedMessage;
        } catch (error) {
          if (error instanceof BadRequestException || error instanceof NotFoundException) {
            throw error;
          }
          if (error.name === 'ValidationError') {
            throw new BadRequestException(error.message);
          }
          throw new InternalServerErrorException(`Failed to send message: ${error.message}`);
        }
      }

}
