import { UserEntity } from "@/domain/entities/UserEntity"
import { User } from "@/infrastructure/dataBase/models/User"

export const getAllUsersWithHostRequest = async () => {
    try {
        const users = await User.find({isBlocked:false})
        console.log("🚀 ~ getAllUsersWithHostRequest ~ users:", users)
        return users as UserEntity[]
    } catch (error: any) {
        console.log("🚀 ~ getAllUsersWithHostRequest ~ error:", error)
        throw new Error(error);
    }
}