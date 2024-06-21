import { IProperty } from "@/domain/entities/propertyEntity";
import { producer } from "..";

export const propertyCreatedProducer = async(property:IProperty | null)=>{
    try {
        await producer.connect();
        const messages =[
            {
                topic:'to-booking-service',
                messages:[
                    {
                        key:"propertyCreated",
                        value:JSON.stringify(property)
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