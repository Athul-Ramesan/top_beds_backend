import { hash } from "bcryptjs";

export const hashPassword = async (password:string)=>{
    try {
        return await  hash(password, 10);
    } catch (error:any) {
        throw new Error( error.message||'Error hashing password');
    }
}