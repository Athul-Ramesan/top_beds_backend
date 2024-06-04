import { IDependencies } from "../interfaces/IDependencies";

export const deletePropertyPhotoUseCase = (dependencies:IDependencies)=>{
        const {repositories:{deletePropertyPhotoRepository}} = dependencies

        return {
            execute: async(propertyId:string,image:string)=>{
               return await deletePropertyPhotoRepository(propertyId,image)
            }
        }
}