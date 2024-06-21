import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.model';
import { ConfigModule } from '@nestjs/config';
import { Property, PropertySchema } from 'src/schema/property.model';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name:Property.name,
      schema: PropertySchema
    }
  ]),
  ConfigModule
  ],
  providers: [KafkaService]
})
export class KafkaModule {}
