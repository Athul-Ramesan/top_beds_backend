import { IDependencies } from "@/application/interfaces/IDependencies"
import { becomeHostProducer } from "@/infrastructure/messages/kafka/producers/hostAddressAddedProducer"
import { addressValidation } from "@/lib/validation/addressValidation"
import { NextFunction, Request, Response } from "express"


export const becomeHostController = (
   dependencies:IDependencies
)=>{
    const {useCases:{addAddressUseCase , changeRoleUseCase}} = dependencies     
    return async (
        req:Request ,
        res:Response,
        next:NextFunction
    )=>{
        const _id  = req.user?._id !
        try {
            const {value,error} =  addressValidation.validate(req.body)

            if(error){
                throw new Error(error?.message);
            }
            const result = await addAddressUseCase(dependencies).execute(_id,value)
            if(!result){
                throw new Error("Error in saving the address please try again")
            }
            const userAfterChangingRole = await changeRoleUseCase(dependencies).execute(_id)
            if(!userAfterChangingRole){
                throw new Error("Error in becoming a host please try again")
                }
                becomeHostProducer(_id,value)
            res.status(200).json({status:"ok",data:userAfterChangingRole,message:"Congrats You are now a host"})
        } catch (error:any) {
            console.log("🚀 ~ AddAddressController ~ error:", error)
            return res.status(500).json({ message: error.message })
        }
    }
}

