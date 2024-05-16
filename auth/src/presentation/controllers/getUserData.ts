import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { customError,IUserPayload} from 'topbeds-package'
export const getUserDataController = (dependencies: IDependencies) => {
    const { useCases: { getUserDataUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const data = req.user as IUserPayload
            const { _id } = data
         
            
            const user = await getUserDataUseCase(dependencies).execute(_id)

            if (user) {
                res.status(200).json({ status: 'ok', data: user })
            } else {
                // throw new customError("couldnt get user data",400);
                
                res.status(400).json({ status: false, message: "couldn't get user data" })
            }
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })
        }
    }
}