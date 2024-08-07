import {becomeHostConsumer} from "./consumer/becomeHostConsumer"
import { profileImageUpdatedConsumer } from "./consumer/profileImageUpdatedConsumer"
import { updateUserDataConsumer } from "./consumer/updateUserDataConsumer"
import {userCreatedConsumer} from "./consumer/userCreatedConsumer"
import { userStatusUpdatedConsumer } from "./consumer/userStatusUpdated"

export const createSubscriber = ()=>{
    return {
        userCreated: userCreatedConsumer,
        becomeHost: becomeHostConsumer,
        profileImageUpdate: profileImageUpdatedConsumer,
        userStatusUpdate: userStatusUpdatedConsumer,
        updateUserData: updateUserDataConsumer
    }
}