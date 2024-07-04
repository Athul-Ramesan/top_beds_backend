import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer }  from '@nestjs/websockets'
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
      origin: '*'
    },
  })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
   @WebSocketServer()
   server:Server
   private onlineUsers: Map<string, string>= new Map();
   constructor(
    private chatService: ChatService
   ){}

   handleConnection(client: Socket, ...args: any[]) {
       console.log('New user connected', client.id)
      const userId = client.handshake.query.userId as string
      console.log("🚀 ~ ChatGateway ~ handleConnection ~ hostId:", userId)
      // if(hostId){
      //   this.onlineUsers.set(hostId,client.id)
      // }
      //  this.server.emit('user-joined', {
      //   message:`New user joined the chat:${client.id}`
      //  })
      // this.server.emit("get_online_users",Object.keys(this.onlineUsers))
      // client.emit("join_chat",())
   }
   
   handleDisconnect(client: Socket) {
       console.log('User disconnected', client.id)

       this.server.emit('user-left',{
        message:`User left the chat:${client.id}`
       })
   }

   @SubscribeMessage('message')
   handleMessage(client:Socket, message:any): void {
       console.log("🚀 ~ ChatGateway ~ handleMessage ~ message:", message)
       
    //    this.server.emit('message',message)
    client.emit('reply', 'This is reply')
    this.server.emit('reply' ,message)
   }
   @SubscribeMessage('chat_request')
   async handleChatRequest(client:Socket, recieverId:any): Promise<any> {
    const senderId = client.handshake.query.hostId as string;
    const senderDetails = await this.chatService.getSenderDetails(senderId)
    const createChatDto = {
      participants: [senderId, recieverId],
      requestStatus:'requested'
    }
    const createdChat = await this.chatService.create(createChatDto)
    // client.to(recieverId).emit('incoming_request',{senderDetails,chatId})
   }
   
   
   @SubscribeMessage('accept_request')
   async handleAcceptRequest(client:Socket, recieverId:any): Promise<any> {
    const senderId = client.handshake.query.hostId as string;
    const senderDetails = await this.chatService.getSenderDetails(senderId)
    const recieverDetails = await this.chatService.getSenderDetails(recieverId)
    this.onlineUsers.set(recieverId,client.id)
    this.onlineUsers.delete(senderId)
    client.to(recieverId).emit('accepted_request',senderDetails,recieverDetails)
    }
}