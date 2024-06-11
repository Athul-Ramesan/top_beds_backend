import { ObjectId } from "mongoose";

enum Role{
    user="user",
    host="host",
    admin="admin"
}
enum Gender{
    male="male",
    female="female",
    transgender="transgender"
}

export interface UserEntity{
    _id?:string,
    firstName?:string,
    lastName?:string,
    username?:string,
    email?:string,
    password?:string,
    role?:Role,
    gender?:Gender,
    isBlocked?:boolean,
    isGoogle?:boolean,
    profileImage?:string ,
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}