import { compare } from "bcryptjs"

export const comparePassword =async (passwordInput: string, passwordDB: string) => {
    try {
        const match = await compare(passwordInput, passwordDB);
        console.log(match,")))))))))))match ");
        
        if (!match) {
            console.log("password mismatch");
            throw new Error("Incorrect email or password");
        }
        return true;
    } catch (error: any) {
        throw new Error(error.message)
    }

}