import { NextFunction, Request, Response } from "express";
import { handleGoogleSignupOrLogin } from "../../_lib/services/handleGoogleSignupOrLogin";
import { handleLogin } from "../../_lib/services/handleLogin";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { customError } from "topbeds-package";

export const loginController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("🚀 ~ return ~ req.body:", req.body);
            console.log("🚀 ~ return ~ req.body.isGoogle:", req.body.isGoogle);

            if (req.body.isGoogle) {
                await handleGoogleSignupOrLogin(dependencies, req, res);
            } else {
                await handleLogin(dependencies, req, res);
            }
        } catch (error: any) {
            console.log(error.message, ' error in catch of login controller');
            const err = new customError(error.message, 400);
            next(err);
        }
    };
};
