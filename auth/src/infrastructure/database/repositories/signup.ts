import { hashPassword } from "../../../_lib/bcrypt/hashPassword";
import { UserEntity, UserLoginEntity } from "../../../domain/entities";
import { User } from "../models";

export const signupRepository = async (
    data: UserEntity
): Promise<UserEntity | null> => {
    console.log("__________inside signup repository");

        
        // const existingUser = await User.findOne({ email: data.email });
        // if (existingUser) {
        //     if(data.isGoogle){
        //         return existingUser
        //     }
        //     throw new Error("User already exist");
        // }
        const hashedPassword = await hashPassword(String(data.password))
        const newData :UserEntity = {
            ...data,
            password :hashedPassword
        }
        const newUser = await User.create(newData)
        return newUser

}