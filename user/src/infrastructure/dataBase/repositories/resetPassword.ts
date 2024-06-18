import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models/User"

export const resetPasswordRepository= async(_id:string,password:string):Promise<UserEntity | null>=>{
    try {
        
        console.log(password);
        
        const user = await User.findByIdAndUpdate(
            _id,
            {$set: {password}},
            {new:true}
        )
        return user
    } catch (error:any) {
        throw new Error(error.message);
    }
    
}