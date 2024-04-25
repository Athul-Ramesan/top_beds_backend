
import { UserLoginEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const loginUseCase = (dependencies:IDependencies)=>{
    const {repositories: {loginRepository}} =  dependencies;
    return {
        execute: async (data:UserLoginEntity) =>{  
        try{    
            if(!data.password || !data.email){
                throw new Error("Email and Password are required");
            }
            try {
             
                 const result= await loginRepository(data);  
                return result
            } catch (error:any) {
                throw new Error("Error in executing login repository in usecase");
            }
        }catch(error){
            console.log('Login Use Case', error);
            throw error;
        }
    }
    };
};