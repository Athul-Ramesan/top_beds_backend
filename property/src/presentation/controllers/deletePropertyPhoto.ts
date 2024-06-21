


import { IDependencies } from "@/application/interfaces/IDependencies";
import { propertyImageDeletedProducer } from "@/infrastructure/messages/kafka/producer/propertyImageDeleted";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const deletePropertyPhotoController = (dependencies: IDependencies) => {
    
    const { useCases: { deletePropertyPhotoUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {propertyId ,image} = req.query
            if (!image) {
                throw new customError('No data provided',400)
            }
            const updatedProperty = await deletePropertyPhotoUseCase(dependencies).execute(String(propertyId),String(image))
            
            propertyImageDeletedProducer(String(propertyId), String(image))
            res.status(200).json({
                message: 'Photo deleted successfully',
                updatedProperty
            })
            
        } catch (error: any) {
            console.log("🚀 ~ file: createPropertyController.ts ~ line 21 ~ error", error)
            next(error)
        }
    }
}