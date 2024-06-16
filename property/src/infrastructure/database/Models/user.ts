import { UserEntity } from "@/domain/entities";
import { Schema,Types,model } from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dateOfBirth: {
        type: Date
    },
    phone: {
        type: String
    },
    address: {
        type: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zip: { type: String },
            phone: {type:String}
        }
    },
    // username:{
    //     type:String,
    //     unique:true,
    //     index:true
    // },
    password:{
        type:String
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
    hostStatus:{
        type:String,
        enum: ["accepted",'rejected','requested'],
    },
    isBlocked: {
        type:Boolean,
        default:false
    },
    isGoogle:{
        type:Boolean,
        default: false
    },
    profileImage:{
        type:String
    },
  
},{
    timestamps:true
})

export const User = model<UserEntity>("user",userSchema)