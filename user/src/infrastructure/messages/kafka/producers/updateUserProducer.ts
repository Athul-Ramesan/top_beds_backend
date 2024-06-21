import { IAddress } from "@/domain/entities/AddressEnitity";
import { producer } from "..";
import { IUserUpdateEntity } from "@/domain/entities/IUserUpdateEntity";

export const updateUserProducer = async (
    _id:string,
    payload: IUserUpdateEntity
)=>{
    try {
        console.log("🚀 ~ payload:", payload)
        
        
        console.log(">>>>>>>>>>>>>🔥🔥🔥 producer of user service user update  producer");
        
       
        await producer.connect()
        const messages= [{
            topic: 'to-auth-service',
            messages:[
                {
                    key:'updateUserData',
                    value: JSON.stringify({_id,...payload})
                }
            ]
        },
        {
            topic:'to-property-service',
            messages:[
                {
                    key:'updateUserData',
                    value: JSON.stringify({_id,...payload})
                }
            ]
        },
        {
            topic:'to-booking-service',
            messages:[
                {
                    key:'updateUserData',
                    value: JSON.stringify({_id,...payload})
                }
            ]
        },
    ]
        await producer.sendBatch({topicMessages:messages})
    } catch (error:any) {
        console.log("🚀 ~ error:", error?.message)
    }finally{
        console.log('disconnected producer of user data update');
        
        await producer.disconnect()
    }
}