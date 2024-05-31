import { IProperty } from "@/domain/entities/propertyEntity";
import { FilterQuery, ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const getAllPropertyRepository= async(
    data: {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
    }
):Promise<IProperty[]>=>{
    
    const page = data.page || 1
    console.log("🚀 ~ page:", page)
    const limit = data.limit || 10
    const skip = (page-1)*limit;
    const query:FilterQuery<IProperty> = {}
    
    
    // if(data.category){
    //     query['category'] =data.category
    // }
    // if(data.search){
    //     const regex = data.search.split(/\s+/).map(splitedPart =>`.*${splitedPart}.*`);
    //     const searchRegex = new RegExp(regex.join('|'),'i')
    //     query['title'] = {$regex:searchRegex}
        
    // }
    
    console.log("🚀 ~ query:", query)
    const properties = await Property.find(query).skip(skip).limit(limit)
    console.log("🚀 ~ getAllPropertyRepository ~ properties:", properties)
    
    if(!properties){
        throw new Error("Error in getting properties");
    }
    return properties
}