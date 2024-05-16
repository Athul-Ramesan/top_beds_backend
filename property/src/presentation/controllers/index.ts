import { IDependencies } from "@/application/interfaces/IDependencies";
import { createPropertyController } from "./createProperty";
import { getAllProperties } from "./getAllProperties";

export const controllers = (dependencies:IDependencies)=>{
    console.log('inside controllers index');
    
    return {
        createProperty: createPropertyController(dependencies),
        getAllProperties: getAllProperties(dependencies)
    }
}