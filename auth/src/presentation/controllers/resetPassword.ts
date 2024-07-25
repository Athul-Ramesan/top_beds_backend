import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { passwordValidation } from "../../_lib/validation"
import resetPasswordProducer from "../../infrastructure/database/messages/kafka/producers/resetPasswordProducer"

export const resetPasswordController = (dependencies:IDependencies)=>{
    const {useCases:{verifyResetTokenUseCase}} = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {token} = req.params
            const user = req.user

            console.log("🚀 ~ return ~ token:", token)
            const {password} = req.body
            console.log("🚀 ~ return ~ password:", password)

            const {value, error } = passwordValidation.validate(password)
            console.log("🚀 ~ return ~ value:", value)
            
            // if(error) return new customError(error.message,400)

            const result = await verifyResetTokenUseCase(dependencies).execute(token,value)
                console.log("🚀 ~ return ~ result:", result)
            const _id = String(user?._id)
            resetPasswordProducer(_id,value)    
            res.status(200).json({message:"password reset successfully"})
            
        } catch (error:any) {
            res.status(400).json({message:error.message})
        }
    }
}