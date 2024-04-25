import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidation } from "../../_lib/validation";
import { generateAccesstoken } from "../../_lib/jwt/generateAccesstoken";
import { generateRefreshToken } from "../../_lib/jwt/generateRefreshToken";


export const loginController = (dependencies: IDependencies) => {
    const {
        useCases: { loginUseCase }
    } = dependencies
    console.log("___________________inside login controller");

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("___________________inside login controller2");

            const { value, error } = loginValidation.validate(req.body)

            if (error) {
                console.log(error.message);

                throw new Error("Invalid data" || error.message)
            }
            const result = await loginUseCase(dependencies).execute({ ...value })
            const accessToken = generateAccesstoken({
                _id: String(result?._id),
                email: result?.email!,
                role: result?.role!
            })

            const refreshToken = generateRefreshToken({
                _id: String(result?._id),
                email: result?.email!,
                role: result?.role!
            })
            res.cookie("access_token", accessToken, { httpOnly: true })
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true
            });
            res.status(201).json({ status: "ok", message: "User Logged In Successfully!", data: result });
        } catch (error: any) {
            console.log(error.message);
            res.status(400).json({ status: "error", message: error.message });
        }

    }
}