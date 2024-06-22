import { IDependencies } from "@/application/interfaces/IDependencies"
import { getAllUsersWithHostRequest } from "@/lib/services/getAllUsersWithHostRequest"
import { NextFunction, Request, Response } from "express"
import { customError } from "topbeds-package"


export const getAllUsersWithHostRequests = (
   dependencies:IDependencies
)=>{
    return async (
        req:Request ,
        res:Response,
        next:NextFunction
    )=>{
        try {
            console.log('inside hostrequest controller 🔢🔢')
            const usersWithHostRequest =await getAllUsersWithHostRequest()
            if(!usersWithHostRequest){
                throw new customError("Couldn't get users",404);
            }
             res.status(200).json({status:"ok",data:usersWithHostRequest, message:"Got all users"})
        } catch (error:any) {
            next(error)
        }
    }
}

