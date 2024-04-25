import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const logoutController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("access_token")

            res.clearCookie("refresh_token")
            console.log('inside logout controller');

            res.status(204).json({ status: "ok" })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}