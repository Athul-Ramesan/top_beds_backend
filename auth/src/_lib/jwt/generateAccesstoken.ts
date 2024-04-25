import jwt from "jsonwebtoken"

export const generateAccesstoken = (
    payload: {
        _id:string,
        email:string,
        role:string
    }
)=>{
    return jwt.sign(
        payload,
        String(process.env.ACCESS_TOKEN_SECRET),
        {expiresIn:'1h'}
    );
};

export const generateAccesstokenForEmailVerification =( email: string) =>{
   let payload={email}
   return jwt.sign(payload,String(process.env.ACCESS_TOKEN_SECRET),{expiresIn:"5min"})
}