import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateRefreshToken } from "../../_lib/jwt/generateRefreshToken";
import { generateAccesstoken } from "../../_lib/jwt/generateAccesstoken";
import userCreatedProducer from "../../infrastructure/database/messages/kafka/producers/userCreatedProducer";
import axios from "axios";

export const googleSignupOrLogin = (dependencies: IDependencies) => {

    const { useCases: { googleSingupOrLoginUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { family_name: firstName, given_name: lastName, picture, email,isGoogle } = req.body;
            const profileImage = picture
            const result = await googleSingupOrLoginUseCase(dependencies).execute({ firstName, lastName, profileImage, email,isGoogle})

            if (!result) {
                throw new Error("User creation failed");
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
            userCreatedProducer(result)
            const accessToken = generateAccesstoken({
                _id: String(result._id),
                email: String(result.email),
                role: String(result.role)
            })
            const refreshToken = generateRefreshToken({
                _id: String(result?._id),
                email: result?.email!,
                role: String(result?.role)
            })
            res.cookie("access_token", accessToken, { httpOnly: true , secure:true, sameSite:"none"})
            res.cookie("refresh_token", refreshToken,  { httpOnly: true , secure:true, sameSite:"none"})
            res.status(201).json({ result })
        } catch (error: any) {
            res.status(400).json({status:false, message: error.message })
        }
    }
}