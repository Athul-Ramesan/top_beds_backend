import { IAddress } from "@/domain/entities/AddressEnitity";
import { producer } from "..";

export const userStatusUpdatedProducer = async (
    _id:string,
    isBlocked:boolean
)=>{
    try {

        
        console.log(">>>>>>>>>>>>>🔥🔥🔥 producer of user service userstatus updated producer");
        
        const dataObject = {
            _id : _id,
            isBlocked: isBlocked
        }
        await producer.connect()
        const messages= [{
            topic: 'to-auth-service',
            messages:[
                {
                    key:'userStatusUpdate',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
        {
            topic:'to-property-service',
            messages:[
                {
                    key:'userStatusUpdate',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
    ]
        await producer.sendBatch({topicMessages:messages})
    } catch (error:any) {
        console.log("🚀 ~ error:", error?.message)
    }finally{
        console.log('disconnected producer of userstatus update');
        await producer.disconnect()
    }
}