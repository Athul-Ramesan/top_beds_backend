import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as cron from 'node-cron';
import { User, UserDocument } from 'src/schema/user.model';

@Injectable()
export class CronService implements OnModuleInit {
    constructor (@InjectModel(User.name) private userModel: Model<UserDocument>,){}
    async onModuleInit() {
        this.scheduleSubscriptionCheck()
    }
    scheduleSubscriptionCheck(){
        cron.schedule('0 0 * * *', () => {
            console.log('inside cron')
            this.checkAndExpireSubscriptions();
          });
    }
    async checkAndExpireSubscriptions(){
        const now = new Date();
        console.log('checking expiry of subscription')
        const usersWithSubscription = await this.userModel.find({
            subscription: { $exists: true }
        })
        console.log("🚀 ~ CronService ~ checkAndExpireSubscriptions ~ usersWithSubscription:", usersWithSubscription)
        for(const user of usersWithSubscription){
            for (const subscription of user.subscriptions){
                if(subscription.expiryDate <now && subscription.active){
                    subscription.active = false;
                }
            }
            user.save()
        }
        
    }
}
