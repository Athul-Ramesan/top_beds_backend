import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schema/chat.model';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.model';
import { Message, MessageDocument } from './schema/message.model';
import { CreateMessageDto } from './dto/createMessageDto';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,

    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,){}

    async create(createChatDto:any):Promise<Chat>{
        const createdChat = new this.chatModel(createChatDto)
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
}
