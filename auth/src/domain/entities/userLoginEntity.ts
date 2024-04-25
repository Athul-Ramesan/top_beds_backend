import { ObjectId } from "mongoose";

export interface UserLoginEntity{
    _id?:ObjectId,
    google:boolean,
    email:string,   
    password?:string
}