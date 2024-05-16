
import { UserLoginEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const loginUseCase = (dependencies:IDependencies)=>{
    const {repositories: {loginRepository}} =  dependencies;
    return {
        execute: async (data:UserLoginEntity) =>{  
   
            if(!data.password || !data.email){
                throw new Error("Email and Password are required");
            }
                 const result= await loginRepository(data);  
                return result
        }
    }
};