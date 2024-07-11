// chat.gateway.ts

import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private onlineUsers: Map<string, string> = new Map();

  constructor(private chatService: ChatService) { }

  handleConnection(client: Socket) {
    console.log('New user connected', client.id);
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.onlineUsers.set(userId, client.id);
      this.server.emit('user_connected', { userId });
    }
    this.server.emit('online_users', Array.from(this.onlineUsers.keys()));
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected', client.id);
    const userId = Array.from(this.onlineUsers.entries())
      .find(([_, socketId]) => socketId === client.id)?.[0];
    if (userId) {
      this.onlineUsers.delete(userId);
      this.server.emit('user_disconnected', { userId });
    }
    this.server.emit('online_users', Array.from(this.onlineUsers.keys()));
  }

  @SubscribeMessage('join_chat')
  async handleJoinChat(client: Socket, chatId: string) {
    client.join(chatId);
  }

  @SubscribeMessage('new_message')
  async handleNewMessage(client: Socket, message: any) {
    console.log("🚀 ~ ChatGateway ~ handleNewMessage ~ message:", message)
    const senderId = client.handshake.query.userId as string;
    const newMessage = await this.chatService.sendMessage({
      sender: senderId,
      receiver: message.receiverId,
      content: message.content,
      contentType: message.contentType,
      chatId: message.chatId
    });
    console.log("🚀 ~ ChatGateway ~ handleNewMessage ~ newMessage:", newMessage)
    this.server.to(message.chatId).emit('new_message_send', newMessage);
  }

  @SubscribeMessage('mark_messages_seen')
  async handleMarkMessagesSeen(client: Socket, data: { chatId: string }) {
    const userId = client.handshake.query.userId as string;
    await this.chatService.markMessagesSeen(data.chatId, userId);
    this.server.to(data.chatId).emit('messages_seen', { userId });
  }


  @SubscribeMessage('videoCall')
  handleVideoCall(client: Socket, data) {
    console.log("Video call data:", data);
    const callerId = client.handshake.query.userId as string;
    const recipientSocketId = this.onlineUsers.get(data.id);

    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('incomingCall', { data });
    } else {
      console.log("Target socket ID not found for video call");
      client.emit('call_failed', { message: 'User is offline' });
    }
  }

  @SubscribeMessage('joinCall')
  handleJoinCall(client: Socket, data: { callId: string }) {
    console.log(`Joining call with callId ${data.callId}`);
    client.join(data.callId);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, data: { answer: any, callId: string }) {
    console.log(`Answer received for call ${data.callId}`);
    client.to(data.callId).emit('answer', { answer: data.answer });
  }

  @SubscribeMessage('endCall')
  handleEndCall(client: Socket, data: { callId: string }) {
    console.log(`Ending call with callId ${data.callId}`);
    this.server.to(data.callId).emit('callEnded');
    this.server.in(data.callId).socketsLeave(data.callId);
  }

  @SubscribeMessage('acceptCall')
  handleAcceptCall(client: Socket, data: { senderId: string, receiverId: string }) {
    console.log(`Accepting call from ${data.senderId} by ${data.receiverId}`);
    const senderSocketId = this.onlineUsers.get(data.senderId);
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('callAccepted', { receiverId: data.receiverId });
    } else {
      console.log("Sender not found to accept call");
      client.emit('call_failed', { message: 'Caller is offline' });
    }
  }

  @SubscribeMessage('declineCall')
  handleDeclineCall(client: Socket, data: { senderId: string, receiverId: string }) {
    console.log(`Declining call from ${data.senderId} by ${data.receiverId}`);
    const senderSocketId = this.onlineUsers.get(data.senderId);
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('callDeclined', { receiverId: data.receiverId });
    } else {
      console.log("Sender not found to decline call");
      client.emit('call_failed', { message: 'Caller is offline' });
    }
  }
}