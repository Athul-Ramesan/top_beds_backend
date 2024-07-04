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
      const hostId = client.handshake.query.hostId as string
      console.log("🚀 ~ ChatGateway ~ handleConnection ~ hostId:", hostId)
      if(hostId){
        this.onlineUsers.set(hostId,client.id)
      }
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
}