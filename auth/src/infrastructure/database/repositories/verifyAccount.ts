import { verificationEntity } from "../../../domain/entities";
import { Otp } from "../models";


export const verifyOtpRepository = async (data: verificationEntity): Promise<verificationEntity> => {
    console.log(data,'data inside verifyotpRepo 3');

    // const isUserExist = await User.findOne({ email:String( data.email )});
    
    // if(isUserExist){
    //     throw new Error("User already exists");
    // }
    
    
    const otpRecord = await Otp.findOne({ email:String( data.email )});
    if (!otpRecord) {
        throw new Error("Something Went wrong please try again");
    }else if(otpRecord.otp === data.otp){  
        return {isOtpMatch:true}
    }else{
        return {isOtpMatch:false}
    }
}