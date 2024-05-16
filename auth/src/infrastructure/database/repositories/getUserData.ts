import { ObjectId } from "mongoose";
import { UserEntity } from "../../../domain/entities";
import { User } from "../models";

export const getUserDataRepository = async (data: ObjectId): Promise<UserEntity | null> => {
    console.log("🚀 ~ getUserDataRepository ~ data:", data)
    
    
    const user = await User.findOne({_id:data})
    if(!user){
        throw new Error("Error finding User data");
    }
    return user
}