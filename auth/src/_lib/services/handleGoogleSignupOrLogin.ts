import { customError } from "topbeds-package";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response } from "express";
import userCreatedProducer from "../../infrastructure/database/messages/kafka/producers/userCreatedProducer";
import { generateTokens } from "../jwt/generateTwoTokens";
import { User } from "../../infrastructure/database/models";

export const handleGoogleSignupOrLogin = async (dependencies: IDependencies, req: Request, res: Response) => {
    const {
        isGoogle,
        aud,
        email,
        family_name: firstName,
        given_name: lastName,
        picture: profileImage,
    } = req.body;

    if (aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new customError('Google authentication failed', 400);
    }

    const existingUser = await User.findOne({ email });
    if(existingUser?.isBlocked){
        throw new customError("Your account has been blocked",403);
        
    }
    console.log("🚀 ~ handleGoogleSignupOrLogin ~ existingUser:", existingUser)
    let result;
    if (!existingUser) {
        result = await dependencies.useCases.googleSingupOrLoginUseCase(dependencies).execute(
            { firstName, lastName, profileImage, email, isGoogle }
        );
        userCreatedProducer(result);
    } else {
        result = existingUser;
    }

    const { accessToken, refreshToken } = generateTokens(result);
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    res.status(201).json({ result });
};
