import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { customError } from "topbeds-package";
import { emailValidation } from "../../_lib/validation/emailValidation";
import { sendPasswordResetEmail } from "../../_lib/verification/sendPasswordResetEmail";

export const forgotPasswordController = (dependencies:IDependencies)=>{
    const {useCases:{emailVerificationUseCase}} = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body
            console.log("🚀 ~ return ~ email:", email)
            
            const {value, error} =  emailValidation.validate({email})
            console.log("🚀 ~ return ~ value:", value)
            
            console.log("🚀 ~ return ~ error:", error)


            if(error) throw new customError(error.message, 400)
            const result = await emailVerificationUseCase(dependencies).execute(value.email)
            

            res.status(200).json({message:'verified'})
        } catch (error:any) {
            console.log("🚀 ~ return ~ error:", error)
            
            res.status(400).json({message:error.message})
        }
    }
}