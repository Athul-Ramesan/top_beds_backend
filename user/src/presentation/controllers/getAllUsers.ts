import { IDependencies } from "@/application/interfaces/IDependencies"
import { becomeHostProducer } from "@/infrastructure/messages/kafka/producers/hostAddressAddedProducer"
import { getTotalUsers } from "@/lib/getTotalUsers"
import { addressValidation } from "@/lib/validation/addressValidation"
import { NextFunction, Request, Response } from "express"
import { customError } from "topbeds-package"


export const getAllUsersController = (
   dependencies:IDependencies
)=>{
    const {useCases:{ getAllUsersUseCase}} = dependencies     
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

            const data = await getAllUsersUseCase(dependencies).execute({limit,page,search})
            console.log("🚀 ~ data:", data)
       
            const totalUsers =await getTotalUsers()
            console.log("🚀 ~ totalUsers:", totalUsers)
            if(!data){
                throw new customError("Couldn't get properties",404);
            }
             res.status(200).json({status:"ok",data,totalCount:totalUsers, message:"Got all users"})
        } catch (error:any) {
            next(error)
        }
    }
}

