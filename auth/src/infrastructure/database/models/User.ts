import { Schema,model } from "mongoose";
import { UserEntity } from "../../../domain/entities";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    // username:{
    //     type:String,
    //     unique:true,
    //     index:true
    // },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    gender:{
        type:String,
        enum:['male','female','transgender']
    },
    role:{
        type:String,
        enum:["user","host","admin"],
        default:"user"
    },
    isBlocked: {
        type:Boolean,
        default:false
    },
    isGoogle:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
})

export const User = model<UserEntity>("user",userSchema)