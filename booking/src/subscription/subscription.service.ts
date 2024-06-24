import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionPlan } from './schemas/subscriptionPlans.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubscriptionPlanDto } from './dto/createSubscriptionPlanDto';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectModel(SubscriptionPlan.name) private subscriptionPlanModel: Model<CreateSubscriptionPlanDto>
    ){}
    async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
        const createdPlan = new this.subscriptionPlanModel(createSubscriptionPlanDto);
        return createdPlan.save();
      }

      async findAll(): Promise<SubscriptionPlan[]> {
        return this.subscriptionPlanModel.find().exec();
      }

      async findOne(id: string): Promise<SubscriptionPlan> {
        const plan = await this.subscriptionPlanModel.findById(id).exec();
        if (!plan) {
          throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
        }
        return plan;
      }

      async remove(id: string): Promise<SubscriptionPlan> {
        const deletedPlan = await this.subscriptionPlanModel.findByIdAndDelete(id).exec();
        if (!deletedPlan) {
          throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
        }
        return deletedPlan;
      }
}
