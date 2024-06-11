import { hostAddressAddedConsumer } from "./consumers/hostAddressAddedConsumer"
import { profileImageUpdatedConsumer } from "./consumers/profileImageUpdatedConsumer"

export const createSubscriber = ()=>{
    return {
        becomeHost: hostAddressAddedConsumer,
        profileImageUpdate: profileImageUpdatedConsumer
    }
}