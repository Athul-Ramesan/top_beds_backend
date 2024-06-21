import { IAddress } from "@/domain/entities/AddressEnitity";
import { producer } from "..";

export const becomeHostProducer = async (
    _id:string,
    data : IAddress
)=>{
    try {

        
        console.log(">>>>>>>>>>>>>🔥🔥🔥 producer of user service become host producer");
        
        const dataObject = {
            _id : _id,
            address :data
        }
        await producer.connect()
        const messages= [{
            topic: 'to-auth-service',
            messages:[
                {
                    key:'becomeHost',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
        {
            topic:'to-property-service',
            messages:[
                {
                    key:'becomeHost',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
        {
            topic:'to-booking-service',
            messages:[
                {
                    key:'becomeHost',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
    ]
        await producer.sendBatch({topicMessages:messages})
    } catch (error:any) {
        console.log("🚀 ~ error:", error?.message)
    }finally{
        console.log('disconnected producer of becomehost');
        
        await producer.disconnect()
    }
}