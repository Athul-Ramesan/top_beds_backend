import { IDependencies } from "../interfaces/IDependencies";

export const changeRoleUseCase = (dependencies:IDependencies)=>{
    const {repositories:{changeRoleRepository} } = dependencies

    return {
        execute: async (_id:string)=>{
            return await changeRoleRepository(_id)
        }
    }
}