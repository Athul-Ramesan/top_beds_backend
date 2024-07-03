import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer }  from '@nestjs/websockets'
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
   @WebSocketServer()
   server:Server

   handleConnection(client: Socket, ...args: any[]) {
       console.log('New user connected', client.id)

       this.server.emit('user-joined', {
        message:`New user joined the chat:${client.id}`
       })
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