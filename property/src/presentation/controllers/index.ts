import { IDependencies } from "@/application/interfaces/IDependencies";
import { createPropertyController } from "./createProperty";
import { getAllProperties } from "./getAllProperties";
import { deletePropertyController } from "./deleteProperty";
import { getHostPropertiesController } from "./getHostProperties";

export const controllers = (dependencies:IDependencies)=>{
    
    return {
        createProperty: createPropertyController(dependencies),
        getAllProperties: getAllProperties(dependencies),
        deleteProperty: deletePropertyController(dependencies),
        getHostProperties: getHostPropertiesController(dependencies)
    }
}