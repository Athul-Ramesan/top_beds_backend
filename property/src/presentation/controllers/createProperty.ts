import { IDependencies } from "@/application/interfaces/IDependencies";
import { validatePropertyData } from "@/lib/validation/validatePropertyDetails";
import cloudinary from "@/utils/cloudinary";
import { NextFunction, Request, Response } from "express";


export const createPropertyController = (dependencies: IDependencies) => {
    
    const { useCases: { createPropertyUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            
            
            const images = req.body.images
            console.log("🚀 ~ return ~ images:", images)

            if (!images || images.length === 0) {
                return res.status(400).json({ message: 'No images provided' });
            }

            const cloudinaryUrls = await Promise.all(
                images.map(async (image:string) => {
                    
                    const cloudinary_res = await cloudinary.uploader.upload(image,{
                        folder: '/TopBeds/properties'
                    })
                    return cloudinary_res.secure_url
                })
            )

            console.log("🚀 ~ return ~ cloudinaryUrls:", cloudinaryUrls)
            const hostId = req.user?._id
            const propertyData = {...req.body,images:cloudinaryUrls,hostId:hostId}
            
            const {value, error} = validatePropertyData.validate(propertyData)
            if(error){
                throw new Error(error.message)
            }

            const property = await createPropertyUseCase(dependencies).execute(value)
            res.status(200).json({
                message: 'property created',
                property
            })
            

        } catch (error: any) {
            console.log("🚀 ~ file: createPropertyController.ts ~ line 21 ~ error", error)

            res.status(400).json(error.message)
        }

    }
}