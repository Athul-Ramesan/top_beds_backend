import { IDependencies } from "../interfaces/IDependencies"

export const getHostIdUseCase =(dependencies:IDependencies)=>{
    
    const {repositories:{getHostIdRepository}} =dependencies

    return {
        execute: async(data:string)=>{
            return await getHostIdRepository(data)
        }
    }
}
