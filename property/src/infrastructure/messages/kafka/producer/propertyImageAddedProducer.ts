import { IProperty } from "@/domain/entities/propertyEntity";
import { producer } from "..";
import { IUpdatePropertyEntity } from "@/domain/entities";

export const propertyImageAddedProducer = async(id:string | null, images:string[]) => {
    
    try {
        await producer.connect();
    console.log("🚀 ~ propertyImageAddedProducer ~ images:", images)
        
        const payload ={ id:id, images:images}
        console.log("🚀 ~ propertyImageAddedProducer ~ payload:", payload)
        const messages =[
            {
                topic:'to-booking-service',
                messages:[
                    {
                        key:"propertyImageAdded",
                        value:JSON.stringify(payload)
                    }
                ]
            }
        ]
        await producer.sendBatch({
            topicMessages: messages
        })
        await producer.disconnect()
    } catch (error:any) {
        console.log("🚀 ~ propertyCreatedProducer ~ error:", error)
    }finally{
        await producer.disconnect()
    }
}