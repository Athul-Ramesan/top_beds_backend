import { IDependencies } from "../interfaces/IDependencies";


export const deletePropertyUseCase = (dependencies:IDependencies)=>{
    const {repositories:{deletePropertyRepository}} =dependencies

    return {
        execute: (data:string)=>{
            return deletePropertyRepository(data)
        }
    }

}