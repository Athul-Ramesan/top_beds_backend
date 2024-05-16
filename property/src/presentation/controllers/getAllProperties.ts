import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getAllProperties = (dependencies:IDependencies)=>{

    const {useCases:{getAllPropertyUseCase}} = dependencies
    
    return async (req: Request, res: Response, next: NextFunction) =>{

        try {
            const properties = await getAllPropertyUseCase(dependencies).execute()

            res.status(201).json({
                status:"success",
                data:properties
            })
        } catch (error:any) {
            console.log("🚀 ~ return ~ error:", error)
            res.status(400).json(error.message)
        }
    }
}