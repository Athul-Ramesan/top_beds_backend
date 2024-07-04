import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/chat/schema/user.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
  ]),
  ConfigModule
  ],
  providers: [KafkaService]
})
export class KafkaModule {}
