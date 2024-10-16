import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { signupValidation } from "../../_lib/validation";
import { generateAccesstoken } from "../../_lib/jwt/generateAccesstoken";
import { generateRefreshToken } from "../../_lib/jwt/generateRefreshToken";
import userCreatedProducer from "../../infrastructure/database/messages/kafka/producers/userCreatedProducer";
import axios from "axios";


interface UserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    given_name?: string;
    family_name?: string;
    isGoogle?: boolean
}
export const signupController = (dependencies: IDependencies) => {


    console.log(dependencies, "=======....depe")
    const { useCases: { signupUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body, 'req.bodyyy');

        try {
            console.log("___________inside signup controller");
            let userData: UserData = {}

            const {confPassword, ...restValues}= req.body
            const { value, error } = signupValidation.validate(restValues)
            if (error) {
                console.log(error.message);
                throw new Error( error.message || "Error in validation" );
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
            userCreatedProducer(result).then(res=>{
                console.log('res');
                console.log('inside userCreated producer calling');
            }).catch(err=>{
                console.log('err in usercreated prducer');
        })
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
            res.cookie("access_token", accessToken, { httpOnly: true , secure:true, sameSite:"none"})
            res.cookie("refresh_token", refreshToken,  { httpOnly: true , secure:true, sameSite:"none"})
            console.log(result, ">>>>>>>>>>>>>>>>>result");

            res.status(201).json({ result })
        } catch (error: any) {
            console.log('inside error of controller');
            res.status(400).json({ status: false, message: error.message })
        }
    }
}