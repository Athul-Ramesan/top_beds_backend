import { Schema, model } from "mongoose";

const FacilitySchema : Schema = new Schema({
    name: {
        type: String
    },
    icon: {
        type:String
    }
})

export const Facility = model<{name:string,icon:string}>('facility',FacilitySchema)