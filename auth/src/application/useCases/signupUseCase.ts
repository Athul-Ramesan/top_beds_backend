import { UserEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies";


export const signupUseCase = (dependencies: IDependencies)=>{
    const {
        repositories:{signupRepository} 
    }= dependencies
    console.log("__________inside signup usecases");
    
    return {
        execute: async(data:UserEntity)=>{
            try {
                return await signupRepository(data)
            } catch (error:any) {
                throw new Error(error?.message)
            }
        }
    }
}