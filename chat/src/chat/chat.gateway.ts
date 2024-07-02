 import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer }  from '@nestjs/websockets'

 @WebSocketGateway(8080)
 export class ChatGateway{
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message:string): void {
        console.log("🚀 ~ ChatGateway ~ handleMessage ~ message:", message)
        
        this.server.emit('message',message)
    }
 }