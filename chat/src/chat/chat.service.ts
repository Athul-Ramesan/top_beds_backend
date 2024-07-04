import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schema/chat.model';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>){}

    async create(createChatDto:any):Promise<Chat>{
        const createdChat = new this.chatModel(createChatDto)
        return createdChat.save()
    }
    async findAllChat():Promise<Chat[]>{

        return this.chatModel.find()
    }
}
