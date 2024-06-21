import { IDependencies } from "@/application/interfaces/IDependencies";
import { propertyCreatedProducer } from "@/infrastructure/messages/kafka/producer/propertyCreated";
import { validatePropertyData } from "@/lib/validation/validatePropertyDetails";
import { uploadMultipleImagesToCloudinary } from "@/utils/cloudinary/uploadImages";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const createPropertyController = (dependencies: IDependencies) => {
    
    const { useCases: { createPropertyUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            
            
            const images = req.body.images
            console.log("🚀 ~ return ~ images:", images)

            if (!images || images.length === 0) {
                throw new customError('No images provided',400)
            }

            const cloudinaryUrls = await uploadMultipleImagesToCloudinary(images)

            console.log("🚀 ~ return ~ cloudinaryUrls:", cloudinaryUrls)
            const hostId = req.user?._id
            const propertyData = {...req.body,images:cloudinaryUrls,hostId:hostId}
            
            const {value, error} = validatePropertyData.validate(propertyData)
            if(error){
                console.log("🚀 ~ return ~ error from validation:", error)
                throw new customError(error.message,400)
            }

            const property = await createPropertyUseCase(dependencies).execute(value)
            propertyCreatedProducer(property)
            res.status(200).json({
                message: 'property created',
                property
            })
            

        } catch (error: any) {
            next(error)
        }
    }
}