import { IUserUpdateEntity } from "@/domain/entities/IUserUpdateEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const updateUserDataUseCase = (dependencies:IDependencies)=>{
    const {repositories:{updateUserDataRepository} } = dependencies

    return {
        execute: async (payload:IUserUpdateEntity)=>{
            return await updateUserDataRepository(payload)
        }
    }
}