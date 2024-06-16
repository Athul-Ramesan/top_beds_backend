
import { User } from "../models/User"
import { UserEntity } from "@/domain/entities/UserEntity"
import { customError } from "topbeds-package"

export const updateProfileImage =async (_id:string,image:string):
Promise<UserEntity | null>=>{
    
    const result = await User.findByIdAndUpdate(
        _id,
        {profileImage:image}
        ,{new:true}) 
    console.log("🚀 ~ result🔥🔥🔥🔥🔥🔥🔥:", result)
    if(!result){
        throw new customError("User Not found ",404);
    }
    return result
}