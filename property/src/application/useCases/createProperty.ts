import { IProperty } from "@/domain/entities/propertyEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const createPropertyUseCase = (dependencies:IDependencies)=>{
    const{ repositories:{createPropertyRepository}} = dependencies

    return{
        execute: (data:IProperty)=>{
            return createPropertyRepository(data)
        }
    }
}