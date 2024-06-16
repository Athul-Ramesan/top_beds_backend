import { IDependencies } from "@/application/interfaces/IDependencies"
import { getAllHosts } from "@/lib/services/getAllHosts"
import { NextFunction, Request, Response } from "express"
import { customError } from "topbeds-package"


export const getAllHostsController = (
    dependencies:IDependencies
)=>{
    return async (
        req:Request ,
        res:Response,
        next:NextFunction
    )=>{
        try {
           console.log(req.query,'req.params')

     
            const page = Number(req.query?.page)
            const limit = Number(req.query?.limit)
            const search = String(req.query?.search)
            const status = String(req.query?.status)

            const hosts = await getAllHosts(page,limit,search,status)
            if(!hosts){
                throw new customError("Couldn't get hosts",404);
            }
             res.status(200).json({status:"ok",hosts, message:"Got all users"})
        } catch (error:any) {
            next(error)
        }
    }
}

