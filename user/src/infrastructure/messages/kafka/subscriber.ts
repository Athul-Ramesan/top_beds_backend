import UserCreatedConsumer from "./consumers/UserCreatedConsumer"
import resetPasswordConsumer from "./consumers/resetPasswordConsumer"

export const createSubscriber = () => {
    return {
        userCreated: UserCreatedConsumer,
        resetPassword: resetPasswordConsumer
    }
}