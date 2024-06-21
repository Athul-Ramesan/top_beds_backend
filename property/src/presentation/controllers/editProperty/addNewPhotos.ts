
import { IDependencies } from "@/application/interfaces/IDependencies";
import { propertyImageAddedProducer } from "@/infrastructure/messages/kafka/producer/propertyImageAddedProducer";
import { propertyUpdatedProducer } from "@/infrastructure/messages/kafka/producer/propertyUpdatedProducer";
import { validateImages } from "@/lib/validation/validateImages";
import { uploadMultipleImagesToCloudinary } from "@/utils/cloudinary/uploadImages";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const addNewPhotosController = (dependencies: IDependencies) => {
    
    const { useCases: { addNewPhotosUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {propertyId} = req.params
            const images = req.body.imageUrls

            if (!images || images.length === 0) {
                throw new customError('No images provided',400)
            }

            const {value, error} = validateImages.validate({images})
            if(error){
                throw new customError(error.message,400)
            }
            const cloudinaryUrls = await uploadMultipleImagesToCloudinary(value.images)

            console.log("🚀 ~ return ~ cloudinaryUrls:", cloudinaryUrls)
            

            const updatedProperty = await addNewPhotosUseCase(dependencies).execute(propertyId,cloudinaryUrls)
            propertyImageAddedProducer(propertyId,cloudinaryUrls)

            res.status(200).json({
                message: 'property updated successfully',
                updatedProperty
            })
            
        } catch (error: any) {
            console.log("🚀 ~ file: createPropertyController.ts ~ line 21 ~ error", error)

            next(error)
        }

    }
}