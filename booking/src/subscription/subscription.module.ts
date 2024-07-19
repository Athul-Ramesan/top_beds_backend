import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionPlan, SubscriptionPlanSchema } from './schemas/subscriptionPlans.model';
import { User, UserSchema } from 'src/schema/user.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionPlan.name, schema: SubscriptionPlanSchema },
      {name: User.name , schema: UserSchema}
    ]),
    HttpModule,
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  // exports: [SubscriptionService],
})
export class SubscriptionModule {}
