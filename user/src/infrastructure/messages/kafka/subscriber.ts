import UserCreatedConsumer from "./consumers/UserCreatedConsumer"

export const createSubscriber = () => {
    return {
        userCreated: UserCreatedConsumer
    }
}