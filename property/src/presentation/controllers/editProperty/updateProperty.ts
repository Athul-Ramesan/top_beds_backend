
import { IDependencies } from "@/application/interfaces/IDependencies";
import { validateUpdatePropertyData } from "@/lib/validation/validateGeneralPropertyData";
import { validateImages } from "@/lib/validation/validateImages";
import { uploadMultipleImagesToCloudinary } from "@/utils/cloudinary/uploadImages";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const updatePropertyController = (dependencies: IDependencies) => {
    
    const { useCases: { updatePropertyUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {propertyId} = req.params
            console.log(req.body,'🔥🔥🔥 req.body')
            const data = req.body
            console.log("🚀 ~ return ~ data:", data)

            if (Object.keys(data).length===0) {
                throw new customError('No data provided',400)
            }

            validateUpdatePropertyData(data)
            
            const updatedProperty = await updatePropertyUseCase(dependencies).execute(propertyId,data)
            console.log("🚀 ~ return ~ updatedProperty:", updatedProperty)
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