import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from './schema/message.model';
import { Chat, ChatSchema } from './schema/chat.model';
import { User, UserSchema } from './schema/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name:Message.name, schema: MessageSchema
    },
      {
      name:Chat.name, schema: ChatSchema
    },
      {
      name:User.name, schema: UserSchema
    },
  ])
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
