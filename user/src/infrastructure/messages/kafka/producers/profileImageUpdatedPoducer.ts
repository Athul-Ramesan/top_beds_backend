import { IAddress } from "@/domain/entities/AddressEnitity";
import { producer } from "..";

export const profileImageUpdatedProducer = async (
    _id:string,
    image:string
)=>{
    try {

        
        console.log(">>>>>>>>>>>>>🔥🔥🔥 producer of user service become host producer");
        
        const dataObject = {
            _id : _id,
            image : image
        }
        await producer.connect()
        const messages= [{
            topic: 'to-auth-service',
            messages:[
                {
                    key:'profileImageUpdate',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
        {
            topic:'to-property-service',
            messages:[
                {
                    key:'profileImageUpdate',
                    value: JSON.stringify(dataObject)
                }
            ]
        },
    ]
        await producer.sendBatch({topicMessages:messages})
    } catch (error:any) {
        console.log("🚀 ~ error:", error?.message)
    }finally{
        console.log('disconnected producer of imageUpdate');
        await producer.disconnect()
    }
}