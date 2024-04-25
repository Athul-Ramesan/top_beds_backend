import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import jwt, { JwtPayload } from "jsonwebtoken"
export const getUserDataController = (dependencies: IDependencies) => {
    const { useCases: { getUserDataUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const token = req.cookies.refresh_token
            const data = jwt.verify(token, String(process.env.REFRESH_TOKEN_SECRET)) as JwtPayload
            const { _id } = data
            const user = await getUserDataUseCase(dependencies).execute(_id)

            if (user) {
                res.status(200).json({ status: 'ok', data: user })
            } else {
                res.status(400).json({ status: false, message: "couldn't get user data" })
            }
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })
        }
    }
}