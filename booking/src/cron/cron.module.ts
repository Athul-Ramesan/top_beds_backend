import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.model';
import { CronController } from './cron.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        }
      ])
    ],
      
    providers:[CronService],
    controllers: [CronController]
})
export class CronModule {}
