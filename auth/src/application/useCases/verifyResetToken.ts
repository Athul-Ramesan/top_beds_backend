import { IDependencies } from "../interfaces/IDependencies"


export const verifyResetTokenUseCase =(dependencies:IDependencies)=>{

    const {repositories:{verifyResetToken} }= dependencies
    return {
        execute:async (token:string,password:string) => {
            console.log("🚀 ~ execute: ~ password:", password)
            console.log("🚀 ~ execute: ~ token:", token)
            
            
                return await verifyResetToken(token,password)
        }
    }
}