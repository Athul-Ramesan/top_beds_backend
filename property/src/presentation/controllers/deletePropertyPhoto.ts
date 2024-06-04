


import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const deletePropertyPhotoController = (dependencies: IDependencies) => {
    
    const { useCases: { deletePropertyPhotoUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.query,'req queryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
            const {propertyId ,image} = req.query
            console.log("🚀 ~ return ~ propertyId:", propertyId)
            

            if (!image) {
                throw new customError('No data provided',400)
            }
            
            const updatedProperty = await deletePropertyPhotoUseCase(dependencies).execute(String(propertyId),String(image))
            
            console.log("🚀 ~ return ~ updatedProperty:", updatedProperty)
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