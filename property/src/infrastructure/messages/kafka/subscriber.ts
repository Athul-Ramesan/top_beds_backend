import becomeHostConsumer from "./consumer/becomeHostConsumer"
import { profileImageUpdatedConsumer } from "./consumer/profileImageUpdatedConsumer"
import userCreatedConsumer from "./consumer/userCreatedConsumer"

export const createSubscriber = ()=>{
    return {
        userCreated: userCreatedConsumer,
        becomeHost: becomeHostConsumer,
        profileImageUpdate: profileImageUpdatedConsumer
    }
}