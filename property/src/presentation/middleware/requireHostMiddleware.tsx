import {NextFunction, Request, Response} from 'express'

const requireHostMiddleware= (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const jwtToken = req.cookies.access_token;

    if(!jwtToken){
        
    }
}