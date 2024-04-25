import { comparePassword } from "../../../_lib/bcrypt/comparePassword";
import { UserEntity, UserLoginEntity } from "../../../domain/entities";
import { User } from "../models";


export const loginRepository =async (data:UserLoginEntity):Promise<UserEntity|null> =>{
    try {
        console.log('data',data);
        const user:UserEntity | null= await User.findOne({email:data.email})  
        if(!user){
            throw new Error("User not found");
            
        }else{
            const match = await comparePassword(String(data.password),String(user.password))  
            console.log(match,'match in login repository');
            
            if (!match) {
                throw new Error("Invalid password")  
            }
                return user as UserEntity
        }
        
    } catch (error:any) {
        console.log(error);
        throw new Error(error.message || 'Error on user login repo');
    }
}