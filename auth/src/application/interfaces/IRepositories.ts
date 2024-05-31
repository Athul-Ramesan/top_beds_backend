import { ObjectId } from "mongoose";
import { UserEntity, UserLoginEntity, verificationEntity } from "../../domain/entities";

export interface IRepositories{
    signupRepository: (data:UserEntity)=>Promise<UserEntity| null>;
    loginRepository:(data:UserLoginEntity)=>Promise<UserEntity |null>;  //sign up repository
    sendOtpRepository:(data:verificationEntity)=>Promise<verificationEntity|null>;
    verifyOtpRepository:(data:verificationEntity)=>Promise<verificationEntity| null>;
    getUserDataRepository:(data:string) => Promise<UserEntity | null> ; 
    emailVerification :(data:string) => Promise<Boolean | null>
    verifyResetToken: (token:string,password:string) =>Promise<Boolean |null>
}
