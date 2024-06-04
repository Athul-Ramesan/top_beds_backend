import { IUpdatePropertyEntity } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePropertyUseCase = (dependencies:IDependencies)=>{

    const {repositories: {updatePropertyRepository} } = dependencies

    return {
        execute: async(proertyId:string,data:IUpdatePropertyEntity)=>{
            return await updatePropertyRepository(proertyId,data)
        }
    }
}