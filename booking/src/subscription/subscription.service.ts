import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionPlan } from './schemas/subscriptionPlans.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubscriptionPlanDto } from './dto/createSubscriptionPlanDto';
import { Model, Types } from 'mongoose';
import { UpdateSubscriptionPlanDto } from './dto/updateSubscriptionPlan.dto';
import { subscribeDto } from './dto/subscribeDto';
import { User, UserDocument } from 'src/schema/user.model';
import axios from 'axios';
import { SubscriptionUpdateException } from './subscription.exception';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(SubscriptionPlan.name) private subscriptionPlanModel: Model<CreateSubscriptionPlanDto>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService
  ) { }
  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    console.log("🚀 ~ SubscriptionService ~ create ~ createSubscriptionPlanDto:", createSubscriptionPlanDto)

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

  async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    const updatedPlan = await this.subscriptionPlanModel
      .findByIdAndUpdate(id, updateSubscriptionPlanDto, { new: true })
      .exec();
    if (!updatedPlan) {
      throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
    }
    return updatedPlan;
  }

  async remove(id: string): Promise<SubscriptionPlan> {
    const deletedPlan = await this.subscriptionPlanModel.findByIdAndDelete(id).exec();
    if (!deletedPlan) {
      throw new NotFoundException(`Subscription plan with ID "${id}" not found`);
    }
    return deletedPlan;
  }

  async subscribe(userId: string, planId: string, session_id: string): Promise<User> {

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    const plan = await this.subscriptionPlanModel.findById(planId).exec();
    if (!plan) {
      throw new NotFoundException(`Subscription plan with ID "${planId}" not found`);
    }

    const newSubscription = {
      plan: plan.name,
      startDate: new Date(),
      expiryDate: new Date(Date.now() + plan.validityPeriod * 24 * 60 * 60 * 1000),
      active: true,
      stripeSessionId: session_id
    }


    const result = await this.userModel.updateOne(
      {
        _id: userId,
        'subscription.plan': { $ne: newSubscription.plan }
      },
      {
        $push: { subscriptions: newSubscription }
      },
    );

    if (result.modifiedCount === 0) {
      await this.userModel.updateOne(
        {
          _id:  userId,
          'subscription.plan': newSubscription.plan
        },
        {
          $set: {
            'subscription.$': newSubscription
          }
        },
      );
    }
    const updatedUser = await this.userModel.findById(userId);
    const payload = {
      id:  userId,
      subscriptionData: newSubscription
    };
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('http://topbeds.smasher.shop/api/auth/update-subscription-data', payload).pipe(
          catchError((error) => {
            throw new SubscriptionUpdateException(`Failed to update subscription: ${error.response?.data?.message || error.message}`);
          })
        )
      );
      return updatedUser
    } catch (error) {
      if (error instanceof SubscriptionUpdateException) {
        throw error;
      }
      return updatedUser
    }
  }

  async makePaymentSession(name: string, amount: number) {
    const stripeInstance = new Stripe(String(process.env.STRIPE_SECRET))

    const lineItems = [{
      price_data: {
        currency: 'inr',
        product_data: {
          name: name,
        },
        unit_amount: Math.floor(amount * 100),
      },
      quantity: 1
    }]
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://topbeds.smasher.shop/api/user/subscription-payment-succes/{CHECKOUT_SESSION_ID}',
      cancel_url: "http://topbeds.smasher.shop/index/cancel-subscription-payment"
    })
    return session.id
  }
  async getSessionStatus(sessionId: string) {
    console.log("🚀 ~ SubscriptionService ~ getSessionStatus ~ sessionId:", sessionId)
    const stripeInstance = new Stripe(String(process.env.STRIPE_SECRET))

    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    return session;
  }
}
