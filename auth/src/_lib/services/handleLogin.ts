import { Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidation } from "../validation";
import { customError } from "topbeds-package";
import { generateTokens } from "../jwt/generateTwoTokens";

export const handleLogin = async (dependencies: IDependencies, req: Request, res: Response) => {
    const { value, error } = loginValidation.validate(req.body);

    if (error) {
        throw new customError( error.message || "Invalid data", 400);
    }

    const result = await dependencies.useCases.loginUseCase(dependencies).execute({ ...value });
    const { accessToken, refreshToken } = generateTokens(result);
    res.cookie("access_token", accessToken,  { httpOnly: true , secure:true, sameSite:"none"});
    res.cookie("refresh_token", refreshToken, { httpOnly: true , secure:true, sameSite:"none"});
    res.status(201).json({ status: "ok", message: "User Logged In Successfully!", data: result });
}