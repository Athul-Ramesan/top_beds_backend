import { IDependencies } from "../interfaces/IDependencies";

export const getAllPropertyUseCase = (dependencies:IDependencies)=>{
        const {repositories: {getAllPropertyRepository}} = dependencies

        return {
            execute:()=>{
                return getAllPropertyRepository()
            }
        }
}