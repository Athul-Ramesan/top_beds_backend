import becomeHostConsumer from "./consumer/becomeHostConsumer"
import userCreatedConsumer from "./consumer/userCreatedConsumer"

export const createSubscriber = ()=>{
    return {
        userCreated: userCreatedConsumer,
        becomeHost: becomeHostConsumer
    }
}