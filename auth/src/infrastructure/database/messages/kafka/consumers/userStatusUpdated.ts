import { updateUserStatusRepository } from "../../../repositories/admin/updateUserStatus";

interface UserStatusUpdatedConsumerProps{
    _id:string
    isBlocked: boolean;
    
}

export const userStatusUpdatedConsumer =async (data:UserStatusUpdatedConsumerProps) => {
    console.log("🚀 ~ userStatusUpdatedConsumer ~ data:", data)
    try {
        const { _id, isBlocked } = data;
        await updateUserStatusRepository(_id,isBlocked)
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}