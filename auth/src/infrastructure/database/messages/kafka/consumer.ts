import { consumer } from "."
import { createSubscriber } from "./subscriber"

export const runConsumer = async ()=>{
    try {
        await consumer.connect()
        await consumer.subscribe({
            topic: 'to-auth-service',
            fromBeginning: true
        })

        const subscriber: any = createSubscriber()
        await consumer.run({
            eachMessage: async ({message}) => {
                console.log("🚀 ~ eachMessage: ~ message:", message)
                const {key, value} = message
                
                
                const subscriberMethod = String(key)
                console.log("🚀 ~ eachMessage: ~ subscriberMethod:😔😔😔😔", subscriberMethod)
                const subscriberData = JSON.parse(String(value))
                console.log("🚀 ~ eachMessage: ~ subscriberData:", subscriberData)
                if(subscriberMethod === "becomeHost"){
                    const {_id,address} = subscriberData
                    try {
                        await subscriber[subscriberMethod](_id,address)
    
                    } catch (error:any) {
                        throw new Error(error?.message);
                    }
                }else{
                    await subscriber[subscriberMethod](subscriberData)
                }
            }
        })
    } catch (error:any) {
        console.log("🚀 ~ runConsumer ~ error:", error)
        
    }
}