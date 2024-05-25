import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";

export const getHostPropertiesController = (dependencies:IDependencies)=>{
        const {useCases:{getHostPropertiesUseCase}} = dependencies

        return async (
            req: Request, res: Response, next: NextFunction
        )=>{
            try {
                
                
                const {hostId} = req.params
                const data = await getHostPropertiesUseCase(dependencies).execute(hostId)

                if(!data){
                   const err = new customError("Property not found",404)
                   next(err)
                }
                res.status(200).json(data)

            } catch (error:any) {
                console.log("🚀 ~ getHostPropertiesController ~ error:", error.message)
                res.status(400)
            }
        }
}