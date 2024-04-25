import { verificationEntity } from "../../../domain/entities";
import { Otp, User } from "../models";

export const sendOtpRepository =async(data:verificationEntity):Promise<verificationEntity>=>{

    if(data.signupYes){
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("User already exist");
        }
    }
    const result = await Otp.create(data)
    console.log(result,'mongodb otp saved result inside repository');
    
    if(!result){
        throw new Error("Error creating otp")
    }
    return result
}