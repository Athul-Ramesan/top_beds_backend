import { IProperty } from "@/domain/entities/propertyEntity";
import { producer } from "..";
import { IUpdatePropertyEntity } from "@/domain/entities";

export const propertyImageDeletedProducer = async(id:string | null, image:string) => {
    
    try {
        await producer.connect();
    console.log("🚀 ~ propertyImageAddedProducer ~ images:", image)
        
        const payload ={ id:id, image:image}
        console.log("🚀 ~ propertyImageAddedProducer ~ payload:", payload)
        const messages =[
            {
                topic:'to-booking-service',
                messages:[
                    {
                        key:"propertyImageDeleted",
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