import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { updateAvailabilityController } from "@/presentation/controllers/editProperty/updateAvailability";

import { upload } from "@/utils/multer/imageUpload";
import { Router } from "express";
import { isUserCheck, requireHost } from "topbeds-package"

export const routes = (dependencies: IDependencies) => {
    const { createProperty,
        getAllProperties,
        deleteProperty,
        getHostProperties,
        uploadNewImages,
        updateProperty,
        deletePropertyPhoto,
        addFacility,
        deleteFacility,
        getAllFacilities,
        searchProperty
     } = controllers(dependencies)
    const router = Router()

    router.route('/add-property')
        .post(
            isUserCheck,
            createProperty
        )
    router.route('/get-all-properties')
        .get(getAllProperties)
    router.route('/delete-property/:id')
        .delete(deleteProperty)
    router.route('/get-host-properties/:hostId')    
        .get(getHostProperties)
    router.route('/upload-images/:propertyId')
        .post(uploadNewImages)    
    router.route('/update-property/:propertyId')
        .post(updateProperty)    
    router.route('/delete-photo')
            .delete(deletePropertyPhoto)   
    router.route('/update-property-availability')
            .patch(updateAvailabilityController)   
    router.route('/add-property-facility')
            .post(addFacility)   
    router.route('/delete-property-facility/:_id')
            .delete(deleteFacility)   
    router.route('/get-property-facility/')
            .get(getAllFacilities)   
    router.route('/search')
            .get(searchProperty)   
             
    return router
};


