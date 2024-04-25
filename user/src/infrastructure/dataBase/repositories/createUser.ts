import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/User"

export const createUser= async(data:UserEntity):Promise<UserEntity | null>=>{
    try {
        
        console.log(data);
        
        const user = await User.create(data)
        return user
    } catch (error:any) {
        throw new Error(error.message);
    }
    
}