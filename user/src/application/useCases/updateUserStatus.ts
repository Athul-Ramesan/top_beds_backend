import { IDependencies } from "../interfaces/IDependencies"

export const updateUserStatusUseCase =(dependencies:IDependencies)=>{
    const {repositories:{updateUserStatusRepository} } = dependencies

    return {
        execute: async (userId:string,isBlocked:boolean)=>{
            return await updateUserStatusRepository(userId,isBlocked)
        }
    }
}