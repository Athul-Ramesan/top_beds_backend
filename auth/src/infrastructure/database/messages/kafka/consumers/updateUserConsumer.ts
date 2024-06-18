import { IUpdateUserData } from "../../../../../domain/entities/IUpdateUserEntity";
import { updateUserDataRepository } from "../../../repositories/user/udpateUserData";



export const updateUserDataConsumer =async (data:IUpdateUserData) => {
    console.log("🚀 ~ userStatusUpdatedConsumer ~ data:", data)
    try {
        await updateUserDataRepository(data)
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}