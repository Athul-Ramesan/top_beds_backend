import { IDependencies } from "@/application/interfaces/IDependencies"
import { profileImageUpdatedProducer } from "@/infrastructure/messages/kafka/producers/profileImageUpdatedPoducer"
import { changeHostStatus } from "@/lib/services/changeHostStatus"
import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { NotFoundError, customError, uploadSingleImageToCloudinary } from "topbeds-package"


export const changeHostStatusController = (
   dependencies:IDependencies
)=>{
    return async (
        req:Request ,
        res:Response,
        next:NextFunction
    )=>{

        const {_id,hostStatus } =req.body
        console.log("🚀 ~ _id:🔢🔢🔢🔢", _id)
        
        try {
            
            const result = await changeHostStatus(_id, hostStatus)
            const response = await axios.patch('https://topbeds.smasher.shop/api/auth/change-host-status', 
                {_id: _id, hostStatus: hostStatus}, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );
             console.log("🚀 ~ response:", response)
             
            res.status(200).json({status:"ok",data:result,message:"Host status updated"})
        } catch (error:any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ status: "error", message: error.message });
            } else if (error instanceof customError) {
                res.status(error.statusCode).json({ status: "error", message: error.message });
            } else {
                next(error); 
            }
        }
    }
}

