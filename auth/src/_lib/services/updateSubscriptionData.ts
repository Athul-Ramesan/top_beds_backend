import { NotFoundError } from "topbeds-package";
import { User } from "../../infrastructure/database/models";
import { ISubscription } from "../../domain/entities";


export const updateSubscriptionData = async (id: string, subscriptionData: ISubscription) => {
    console.log("🚀 ~ updateSubscriptionData ~ subscriptionData:", subscriptionData)
    console.log("🚀 ~ updateSubscriptionData ~ id:", id)
    try {
        const user =await User.findOne({_id:id})
        console.log("🚀 ~ updateSubscriptionData ~ user:", user)
        
        const result = await User.updateOne(
            { 
              _id: id,
              'subscription.plan': { $ne: subscriptionData.plan }
            },
            { 
              $push: { subscriptions: subscriptionData } 
            }
          );
        
          if (result.modifiedCount === 0) {
            await User.updateOne(
              { 
                _id: id,
                'subscription.plan': subscriptionData.plan 
              },
              { 
                $set: { 
                  'subscription.$': subscriptionData 
                } 
              }
            );
          }
        console.log("🚀 ~ updateSubscriptionData ~ result:", result)
        
        if (!result) {
            throw new NotFoundError()
        }
        return result
    } catch (error: any) {
        throw new Error(error);

    }
}