import { NotFoundError } from "topbeds-package";
import { User } from "../../infrastructure/database/models";
import { IBooking, ISubscription } from "../../domain/entities";


export const updateBooking = async (id: string, booking:IBooking ) => {
    console.log("🚀 ~ updateSubscriptionData ~ subscriptionData:", booking)
    console.log("🚀 ~ updateSubscriptionData ~ id:", id)
    try {
        const user =await User.findOne({_id:id})
        console.log("🚀 ~ updateSubscriptionData ~ user:", user)
        
        const result = await User.updateOne(
            { 
              _id: id,
            },
            booking,
            { upsert: true },
          )
        console.log("🚀 ~ updateBooking ~ result:", result)
        
        if (!result) {
            console.log("🚀 ~ updateBooking ~ result:", result)
            throw new NotFoundError()
        }
        return result
    } catch (error: any) {
        throw new Error(error);
    }
}