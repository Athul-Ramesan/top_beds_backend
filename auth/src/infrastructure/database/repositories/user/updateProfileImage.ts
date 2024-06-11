import { customError } from "topbeds-package";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../../models";



export const updateProfileImage =async (_id:string,profileImage:string):
Promise<UserEntity | null>=>{
   try {
    console.log('inside profile image update repository of property service')
  
    const result = await User.findByIdAndUpdate(
        _id,
        {profileImage}
        ,{new:true}) 
    if(!result){
        throw new customError("User Not found ",404);
    }
    return result
   } catch (error:any) {
    console.log("🚀 ~ error:", error)
    
    throw new Error(error.message);
    
   }
}