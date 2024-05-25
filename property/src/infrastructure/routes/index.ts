import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";

import { upload } from "@/utils/multer/imageUpload";
import { Router } from "express";
import { isUserCheck, requireHost } from "topbeds-package"

export const routes = (dependencies: IDependencies) => {
    const { createProperty,
        getAllProperties,
        deleteProperty,
        getHostProperties
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
        .delete(isUserCheck,deleteProperty)
    router.route('/get-host-properties/:hostId')    
        .get(getHostProperties)
    return router
};

