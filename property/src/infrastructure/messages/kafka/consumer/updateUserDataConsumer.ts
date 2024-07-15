import { IUpdateUserData } from "@/domain/entities/IUpdateUserData";
import { updateUserDataRepository } from "@/infrastructure/database/repositories/user/updateUserData";

export const updateUserDataConsumer =async (data:IUpdateUserData) => {
    console.log("🚀 ~ userStatusUpdatedConsumer ~ data:", data)
    try {
        await updateUserDataRepository(data)
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}