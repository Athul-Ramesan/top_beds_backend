import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { updateAvailabilityController } from "@/presentation/controllers/editProperty/updateAvailability";

import { upload } from "@/utils/multer/imageUpload";
import { Router } from "express";
import { isUserCheck, requireAdmin, requireHost } from "topbeds-package"

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
            requireHost,
            createProperty
        )
    router.route('/get-all-properties')
        .get(getAllProperties)
    router.route('/delete-property/:id')
        .delete(isUserCheck,deleteProperty)
    router.route('/get-host-properties/:hostId')    
        .get(getHostProperties)
    router.route('/upload-images/:propertyId')
        .post(isUserCheck,requireHost, uploadNewImages)    
    router.route('/update-property/:propertyId')
        .post(isUserCheck,requireHost, updateProperty)    
    router.route('/delete-photo')
            .delete(isUserCheck,requireHost, deletePropertyPhoto)   
    router.route('/update-property-availability')
            .patch(isUserCheck, updateAvailabilityController)   
    router.route('/add-property-facility')
            .post(isUserCheck,addFacility)   
    router.route('/delete-property-facility/:_id')
            .delete(isUserCheck,requireAdmin, deleteFacility)   
    router.route('/get-property-facility/')
            .get(isUserCheck,getAllFacilities)   
    router.route('/search')
            .get(searchProperty)   
             
    return router
};


