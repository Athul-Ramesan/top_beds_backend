import { NextFunction, Request, Response } from "express";

const errorHandler = (
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    return res.status(err.statusCode).json({
        status: err.status,
        message:err.message
    })
}

export default errorHandler