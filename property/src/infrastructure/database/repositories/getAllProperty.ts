import { IProperty } from "@/domain/entities/propertyEntity";
import { ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const getAllPropertyRepository= async():Promise<IProperty[]>=>{
    const properties = await Property.find({})
    if(!properties){
        throw new Error("Error in getting properties");
    }
    return properties
}