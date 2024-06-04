import { IDependencies } from "../interfaces/IDependencies";


export const deletePropertyUseCase = (dependencies:IDependencies)=>{
    const {repositories:{deletePropertyRepository}} =dependencies

    return {
        execute: async(data:string)=>{
            return await deletePropertyRepository(data)
        }
    }

}