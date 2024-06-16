import { hashPassword } from "../../../_lib/bcrypt/hashPassword";
import { UserEntity, UserLoginEntity } from "../../../domain/entities";
import { User } from "../models";

export const signupRepository = async (
    data: UserEntity
): Promise<UserEntity | null> => {
    console.log(data,"__________inside signup repository");

        
    try {
            // const existingUser = await User.findOne({ email: data.email });
        // if (existingUser) {
        //     if(data.isGoogle){
        //         return existingUser
        //     }
        //     throw new Error("User already exist");
        // }
        let newData :UserEntity={}
          console.log("🚀 ~ newData:", newData)
          
        if(data.password){
            const hashedPassword = await hashPassword(String(data.password))
            console.log("🚀 ~ hashedPassword:", hashedPassword)
             newData= {
                ...data,
                password :hashedPassword
            }
        }else{
            newData = {
                ...data
            };
        }
        console.log("🚀 ~ newData:", newData)
        const newUser = await User.create(newData)
        console.log("🚀 ~ newUser:", newUser)

        
        return newUser
    } catch (error:any) {
        console.log("🚀 ~ error:", error)
        throw new Error(error)
    }
}

