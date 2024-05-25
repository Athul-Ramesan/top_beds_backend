import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface IUserPayload {
    _id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload;
        }
    }
}

export const isUserCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtAccessToken = req.cookies?.access_token;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>is user check");
    console.log("🚀 ~ jwtAccessToken:", jwtAccessToken);
    

    
    if (jwtAccessToken) {
        try {
            const payload = jwt.verify(jwtAccessToken, process.env.ACCESS_TOKEN_SECRET!) as IUserPayload;
            console.log("🚀 ~ payload:", payload);


            req.user = payload;
            next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                const jwtRefreshToken = req.cookies?.refresh_token;
                console.log("🚀 ~ jwtRefreshToken:", jwtRefreshToken);

                if (!jwtRefreshToken) {
                    return res.status(401).json({
                        message: "Unauthorized",
                    });
                }
                try {
                    const payload = jwt.verify(jwtRefreshToken, process.env.REFRESH_TOKEN_SECRET!) as IUserPayload;
                    console.log("🚀 ~ payload refreshtoken:", payload);

                    const newAccessToken = jwt.sign(
                        { _id: payload._id, email: payload.email, role: payload.role },
                        process.env.ACCESS_TOKEN_SECRET!,
                        { expiresIn: '24hr' }
                    );

                    res.cookie('access_token', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
                        sameSite: 'strict', // strict same-site policy
                    });

                    req.user = payload;
                    next();
                } catch (error: any) {
                    console.error("Error verifying refresh token:", error);
                    return res.status(401).json({
                        message: "Unauthorized",
                    });
                }
            } else {
                console.error("Error verifying access token:", error);
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
