import { UserEntity } from "@/domain/entities/UserEntity"
import { User } from "@/infrastructure/dataBase/models/User"

export const getUserDataById= async(_id:string)=>{
    const user = await User.findById(_id)
    return user as UserEntity
}