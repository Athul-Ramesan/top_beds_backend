import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOtp } from "../../_lib/generateOtp";
import { generateEmailWithOtp } from "../../_lib/verification/generateEmail";


export const sendOtpController =(dependencies:IDependencies)=>{

    const { useCases: {sendOtpUseCase} } = dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const {email,signup:signupYes} = req.body
           console.log(req.body,'req body in sendotp controlller');
           const otp = generateOtp()
           console.log("{{{{",otp,"}}}} otp");
           const result = await sendOtpUseCase(dependencies).execute({email,otp,signupYes})
           if(result){
               await generateEmailWithOtp(email,otp)
           }
            console.log(result,"{}result in sendotp{}");
            res.json({status:"ok"})
        } catch (error:any) {
            console.log(error,"eror inside catch of sendotp controlller");
            res.status(400).json({status:false,message:error.message})
        }
    }
}