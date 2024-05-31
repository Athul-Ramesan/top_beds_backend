import { IDependencies } from "@/application/interfaces/IDependencies";
import { getTotalPage } from "@/lib/getTotalPage";
import { NextFunction, Request, Response } from "express";

export const getAllProperties = (dependencies:IDependencies)=>{

    const {useCases:{getAllPropertyUseCase}} = dependencies
    
    return async (req
        : Request, res: Response, next: NextFunction) =>{


        try {

            const page = Number(req.query?.page)
            const limit = Number(req.query?.limit)
            const category = String(req.query?.category)
            const search = String(req.query?.search)

            const properties = await getAllPropertyUseCase(dependencies).execute(
                {page,limit,category,search}
            )
            const totalItems = await getTotalPage()
            
            res.status(201).json({
                status:"success",
                data:properties,
                totalItems:totalItems
            })

        } catch (error:any) {
            console.log("🚀 ~ return ~ error:", error)
            res.status(400).json(error.message)
        }
    }
}