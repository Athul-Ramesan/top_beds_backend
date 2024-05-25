import { IDependencies } from "../interfaces/IDependencies";

export const getHostPropertiesUseCase = (dependencies:IDependencies)=>{
    const {repositories: {getHostPropertiesRepository}} = dependencies

    return {
        execute : async(_id:string) => {
            console.log("🚀 ~ execute:async ~ _id:", _id)
                      
            return await getHostPropertiesRepository(_id)
        }
    }
}