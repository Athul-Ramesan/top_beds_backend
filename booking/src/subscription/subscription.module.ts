import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionPlan, SubscriptionPlanSchema } from './schemas/subscriptionPlans.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubscriptionPlan.name, schema: SubscriptionPlanSchema }]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
