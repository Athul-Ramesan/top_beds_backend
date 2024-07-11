import { IDependencies } from "@/application/interfaces/IDependencies";
import { createPropertyController } from "./createProperty";
import { getAllProperties } from "./getAllProperties";
import { deletePropertyController } from "./deleteProperty";
import { getHostPropertiesController } from "./getHostProperties";
import { addNewPhotosController } from "./editProperty/addNewPhotos";
import { updatePropertyController } from "./editProperty/updateProperty";
import { deletePropertyPhotoController } from "./deletePropertyPhoto";
import { addFacilityController } from "./editProperty/addFacility";
import { deleteFacilityController } from "./editProperty/deleteFacility";
import { getAllFacilitiesController } from "./editProperty/getAllFacilities";
import { searchPropertyController } from "./searchProperty";

export const controllers = (dependencies:IDependencies)=>{
    
    return {
        createProperty: createPropertyController(dependencies),
        getAllFacilities:getAllFacilitiesController,
        getAllProperties: getAllProperties(dependencies),
        deleteProperty: deletePropertyController(dependencies),
        getHostProperties: getHostPropertiesController(dependencies),
        addFacility: addFacilityController,
        uploadNewImages: addNewPhotosController(dependencies),
        deleteFacility: deleteFacilityController,
        updateProperty :updatePropertyController(dependencies),
        searchProperty: searchPropertyController,
        deletePropertyPhoto: deletePropertyPhotoController(dependencies),
    }
}