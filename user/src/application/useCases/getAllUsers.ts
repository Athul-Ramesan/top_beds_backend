import { IDependencies } from "../interfaces/IDependencies";

export const getAllUsersUseCase =(dependencies:IDependencies)=>{

    const {repositories:{getAllUsersRepository}} = dependencies

    return {
        execute : async (data:{
            page?:  number;
            limit?: number;
            isBlocked?: boolean;
            search?: string
        })=>{
            return await getAllUsersRepository(data)
        }
    }
}