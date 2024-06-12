import { hostAddressAddedConsumer } from "./consumers/hostAddressAddedConsumer"
import { profileImageUpdatedConsumer } from "./consumers/profileImageUpdatedConsumer"
import { userStatusUpdatedConsumer } from "./consumers/userStatusUpdated"

export const createSubscriber = ()=>{
    return {
        becomeHost: hostAddressAddedConsumer,
        profileImageUpdate: profileImageUpdatedConsumer,
        userStatusUpdate: userStatusUpdatedConsumer
    }
}