import { IDependencies } from "../interfaces/IDependencies"

export const getHostIdUseCase =(dependencies:IDependencies)=>{
    
    const {repositories:{getHostIdRepository}} =dependencies

    return {
        execute: (data:string)=>{
            return getHostIdRepository(data)
        }
    }
}