import { IDependencies } from "@/application/interfaces/IDependencies"
import { profileImageUpdatedProducer } from "@/infrastructure/messages/kafka/producers/profileImageUpdatedPoducer"
import { userStatusUpdatedProducer } from "@/infrastructure/messages/kafka/producers/userStatusUpdated"
import { addressValidation } from "@/lib/validation/addressValidation"
import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { NotFoundError, customError, uploadSingleImageToCloudinary } from "topbeds-package"


export const updateUserStatusController = (
   dependencies:IDependencies
)=>{
    const {useCases:{updateUserStatusUseCase}} = dependencies     
    return async (
        req:Request ,
        res:Response,
        next:NextFunction
    )=>{

        const {userId} = req.params
        console.log("🚀 ~ userId:", userId)
        const {isBlocked} = req.body
        try {
            
            const result = await updateUserStatusUseCase(dependencies).execute(userId,isBlocked)
            if(!result){
                throw new NotFoundError()
            }
            const payload = { isBlocked:isBlocked}
            const response = await axios.post(`https://topbeds.smasher.shop/api/auth/update-user-data/${userId}`, 
                {payload}, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );
                console.log("🚀 ~ response:", response)
                userStatusUpdatedProducer(userId,isBlocked)

            res.status(200).json({status:"ok",data:result,message:"User status Updated"})
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

