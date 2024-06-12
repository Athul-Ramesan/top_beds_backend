import { consumer } from "."
import { createSubscriber } from "./subscriber";

export const runConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({
            topic: 'to-property-service',
            fromBeginning: true
        })
        const subscriber: any = createSubscriber()

        console.log('inside run consumer 🔥🔥🔥🔥🔥🔥');

        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log("🚀 ~ eachMessage:async ~ message:😍😍😍😍", message)


                const { key, value } = message;
                const subscriberMethod = String(key)
                console.log("🚀 ~ eachMessage:async ~ subscriberMethod:", subscriberMethod)

                const subscriberData = JSON.parse(String(value))
                const { _id, address } = subscriberData
                console.log("🚀 ~ eachMessage:async ~ subscriberData:", subscriberData)
                if (subscriberMethod === "becomeHost") {
                    try {
                        await subscriber[subscriberMethod](_id, address);

                    } catch (error: any) {
                        throw new Error(error?.message);
                    }
                } else {
                    try {
                        await subscriber[subscriberMethod](subscriberData)
                    } catch (error: any) {
                        throw new Error(error?.message);
                    }
                }
            }
        })
    } catch (error: any) {
        throw new Error(error.message);

    }
}

export const stopConsumer = async () => {
    await consumer.stop()
    await consumer.disconnect()
}