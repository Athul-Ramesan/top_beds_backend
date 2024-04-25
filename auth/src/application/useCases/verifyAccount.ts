import { verificationEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies:IDependencies)=>{
    const {repositories: {verifyOtpRepository}} = dependencies

    return {
        execute: async (data:verificationEntity)=>{
            console.log(data,'data inside usecase 2');
            
            return await verifyOtpRepository(data)
        }
    }
}