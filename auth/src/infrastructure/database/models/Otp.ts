import { Schema, model } from "mongoose";
import { OtpEntity } from "../../../domain/entities/otp";

const OtpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default : Date.now,
        expires:'1m'
    }
})

export const Otp = model<OtpEntity>('Otp', OtpSchema)