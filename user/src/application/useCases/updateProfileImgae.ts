import { IDependencies } from "../interfaces/IDependencies";

export const updateProfileImageUseCase = (dependencies:IDependencies)=>{
    const {repositories:{updateProfileImage} } = dependencies

    return {
        execute: async (_id:string,image:string)=>{
            return await updateProfileImage(_id,image)
        }
    }
}