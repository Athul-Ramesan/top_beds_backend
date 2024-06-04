import { IDependencies } from "../interfaces/IDependencies";

export const addNewPhotosUseCase =(dependencies:IDependencies)=>{
    const {repositories:{addNewPhotosRepository}} = dependencies

    return {
        execute : async(propertyId:string, images:string[])=>{
            return await addNewPhotosRepository(propertyId, images)
        }
    }
}