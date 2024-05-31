import { IDependencies } from "../interfaces/IDependencies";

export const getAllPropertyUseCase = (dependencies:IDependencies)=>{
        const {repositories: {getAllPropertyRepository}} = dependencies

        return {
            execute:async(data:{
                page?: number;
                limit?: number;
                category?: string;
                search?: string;
            })=>{
                return await getAllPropertyRepository(data)
            }
        }
}