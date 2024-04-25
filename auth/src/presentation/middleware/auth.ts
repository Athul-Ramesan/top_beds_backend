import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtToken = req.cookies.access_token;

    if (jwtToken) {
        jwt.verify(
            jwtToken,
            process.env.ACCESS_TOKEN_SECRET as string,
            (error: VerifyErrors | null) => {
                if (error) {
                    res.status(401).json({ success: false, message: "Unauthorized" });
                } else {
                    next();
                }
            }
        );
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
