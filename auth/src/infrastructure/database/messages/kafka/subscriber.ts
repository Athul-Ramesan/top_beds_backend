import { hostAddressAddedConsumer } from "./consumers/hostAddressAddedConsumer"

export const createSubscriber = ()=>{
    return {
        becomeHost: hostAddressAddedConsumer
    }
}