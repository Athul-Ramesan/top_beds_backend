import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { signupValidation } from "../../_lib/validation";
import { generateAccesstoken } from "../../_lib/jwt/generateAccesstoken";
import { generateRefreshToken } from "../../_lib/jwt/generateRefreshToken";
import userCreatedProducer from "../../infrastructure/database/messages/kafka/producers/userCreatedProducer";
import axios from "axios";

export const verifyOtpController = (dependencies:IDependencies)=>{

    const {useCases: {verifyOtpUseCase ,signupUseCase}} = dependencies;
    return async (req:Request, res:Response,next: NextFunction) =>{
        try {
            console.log(req.body ,'call inside verifyOtpcontroller');
            const {otp,confPassword,email,...restValues} = req.body;
            
              const resultFromOtpVerification= await verifyOtpUseCase(dependencies).execute({otp,email});
              console.log(resultFromOtpVerification,'isotpmatch inside verification controller');
              
            if(resultFromOtpVerification?.isOtpMatch){        
                const {value,error} = signupValidation.validate({email,...restValues})
                 if (error) {
                    console.log(error.message);
                    throw new Error(error.message ||"Error in validation");
                }
                const result = await signupUseCase(dependencies).execute(value)
                if (!result) {
                    throw new Error("User creation failed")
                }
                const chatResponse = await axios.post(`http://topbeds.smasher.shop/api/chat/create-user`, result,
                    {
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    })
                    console.log(chatResponse, 'user created response from chat' )
                await userCreatedProducer(result)
                const accessToken = generateAccesstoken({
                    _id: String(result._id),
                    email: String(result.email),
                    role: result.role!
                })
                const refreshToken = generateRefreshToken({
                    _id: String(result?._id),
                    email: result?.email!,
                    role: result?.role!
                })
                console.log(accessToken);
                res.cookie("access_token", accessToken, { httpOnly: true, secure:true, sameSite:"none" })
                res.cookie("refresh_token", refreshToken, { httpOnly: true, secure:true, sameSite:"none" })
                console.log(result, ">>>>>>>>>>>>>>>>>result");
    
                res.status(201).json({ result })
                
            }else{
                res.status(400).json({status:false,type:"otp",message:"Otp doesn't match"})
            }
        } catch (error:any) {
            res.status(400).json({
                message: error.message,
                data: null
            })
        }
    }
}