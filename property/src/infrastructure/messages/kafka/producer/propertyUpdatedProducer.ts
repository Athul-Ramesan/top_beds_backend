import { IProperty } from "@/domain/entities/propertyEntity";
import { producer } from "..";
import { IUpdatePropertyEntity } from "@/domain/entities";

export const propertyUpdatedProducer = async(id:string | null, data:IUpdatePropertyEntity)=>{
    try {
        await producer.connect();
        const payload ={ id:id, ...data}
        console.log("🚀 ~ propertyUpdatedProducer ~ payload:", payload)
        const messages =[
            {
                topic:'to-booking-service',
                messages:[
                    {
                        key:"propertyUpdated",
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