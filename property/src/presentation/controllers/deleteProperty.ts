import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";


export const deletePropertyController = (dependencies:IDependencies)=>{

    const {useCases:{deletePropertyUseCase}} = dependencies

    return async (
        req: Request, res: Response, next: NextFunction
    )=>{
        const _id = req.params?.id
        try {
            const isDeleted = deletePropertyUseCase(dependencies).execute(_id)
            
            res.status(200).json({
                status:"success",
                message: "Property deleted successfully"
            })
        } catch (error:any) {
            console.log("🚀 ~ deletePropertyController ~ error:", error)

            res.status(400).json(error.message)
        }
    }
}