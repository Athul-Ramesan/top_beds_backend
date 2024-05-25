import mongoose from "mongoose"
import { User } from "../models/User"
import { UserEntity } from "@/domain/entities/UserEntity"

export const changeRoleRepository =async (_id:string):
Promise<UserEntity | null>=>{
    
   try {    
    const result = await User.findByIdAndUpdate(_id, {role:'host'},{new:true}) 
    console.log("🚀 ~ result:", result)
    
    return result
    
   } catch (error:any) {
        throw new Error(error.message)
   }
}