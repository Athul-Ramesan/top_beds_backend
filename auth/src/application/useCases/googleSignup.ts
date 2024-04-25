import { UserEntity } from "../../domain/entities";
import { signupRepository } from "../../infrastructure/database/repositories";
import { IDependencies } from "../interfaces/IDependencies";

export const googleSingupOrLoginUseCase =(dependencies:IDependencies)=>{

    const {repositories:{signupRepository} }= dependencies
    return {
        execute:async (data:UserEntity)=>{
                return await signupRepository(data)
        }
    }
}