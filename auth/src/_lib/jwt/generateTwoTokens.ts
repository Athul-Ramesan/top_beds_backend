import { generateAccesstoken } from "./generateAccesstoken";
import { generateRefreshToken } from "./generateRefreshToken";

export const generateTokens = (user: any) => {
    const accessToken = generateAccesstoken({
        _id: String(user?._id),
        email: String(user?.email),
        role: String(user?.role)
    });

    const refreshToken = generateRefreshToken({
        _id: String(user?._id),
        email: user?.email!,
        role: String(user?.role)
    });

    return { accessToken, refreshToken };
};
