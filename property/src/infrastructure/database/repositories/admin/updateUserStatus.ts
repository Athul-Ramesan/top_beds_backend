import { customError } from "topbeds-package"
import { User } from "../../Models"

export const updateUserStatusRepository = async(userId:string, isBlocked:boolean)=>{
    
    const updatedUser = await User.findByIdAndUpdate(userId,{isBlocked:!isBlocked},{new:true})
    if(!updatedUser){
        throw new customError("User not found",404)
    }
    return updatedUser
}