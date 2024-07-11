import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/createMessageDto';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) { }
    @Post('/send-message/:senderId/:receiverId')
    async sendMessage(
        @Param('senderId') senderId: string,
        @Param('receiverId') receiverId: string,
        @Body() createMessageDto: CreateMessageDto,) {
        console.log("🚀 ~ ChatController ~ receiverId:", receiverId)
        console.log("🚀 ~ ChatController ~ senderId:", senderId)
        console.log("🚀 ~ ChatController ~ @Body ~ createMessageDto:", createMessageDto)
        const createChatDto = {
            participants: [senderId, receiverId],
        }
        
        const newMessageDto = {
            ...createMessageDto,
            sender:senderId,
            receiver:receiverId,
          };
        const chat = await this.chatService.create(createChatDto,newMessageDto);
        return chat;
    }

    @Get('get-chats/:senderId')
    async getChatsBySender(@Param("senderId") senderId:string ){
        console.log("🚀 ~ ChatController ~ getChatsBySender ~ senderId:", senderId)
        return this.chatService.getChatsBySender(senderId)
    }
}
