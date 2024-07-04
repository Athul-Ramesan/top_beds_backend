import { Injectable } from '@nestjs/common';
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
        const existingChat = await this.chatModel.findOne({
            participants: {
                $all: [
                    {$elemMatch:{$eq: senderId}},
                    {$elemMatch:{$eq: receiverId}}
                ]
            }
        })
        console.log("🚀 ~ ChatService ~ getChatBetweenParticipants ~ existingChat:", existingChat)
        return existingChat
    }

    async create(createChatDto:any, newMessageDto:CreateMessageDto):Promise<Chat>{

        const {senderId, receiverId} = createChatDto
        const existingChat = await this.getChatBetweenParticipants(senderId,receiverId)
        if(existingChat){

            return existingChat
        }

        const createdChat = new this.chatModel(createChatDto)
        this.sendMessage(newMessageDto)
        return createdChat.save()
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

    async sendMessage (createMessageDto:CreateMessageDto):Promise<Message>{
        const {sender, receiver } = createMessageDto
        const chat = await this.getChatBetweenParticipants(sender,receiver) as ChatDocument
        const messageToSave = new this.messageModel(createMessageDto)
        const savedMessage =await messageToSave.save() as MessageDocument

        chat.messages.push(savedMessage._id as Types.ObjectId)
        await chat.save() as ChatDocument
        return  savedMessage
    }

}
