import { IProperty } from "@/domain/entities/propertyEntity";
import { FilterQuery, ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const getAllPropertyRepository= async(
    data: {
        page?: number;
        limit?: number;
        category?: string,
        priceRange?: string,
        location?: string,
        guestCount?: string,
        sort?:string,
        search?:string
    }
):Promise<IProperty[]>=>{
    
    const page = data.page || 1
    
    const limit = data.limit || 10
    const skip = (page-1)*limit;
    console.log("🚀 ~ skip:", skip)
    const query:FilterQuery<IProperty> = {}
    let priceQuery = {}
    let guestCountQuery= {}
    let sortOption ={}
    
    if(data.category){
        query['category'] =data.category
    }
    if(data.location){
        query['location'] = data.location
    }
    if(data.guestCount){
        guestCountQuery = {$gte:Number(data.guestCount)}
        query['maxGuests'] = guestCountQuery
    }
    if(data.priceRange){
        const splitedPriceRange = data.priceRange.split("-").map(Number)
        const minimumPrice = splitedPriceRange[0]
        const maximumPrice = splitedPriceRange[1]
        priceQuery = {$gte: minimumPrice , $lte: maximumPrice}
        query['price'] = priceQuery
    }
    if(data.sort){
        if(data.sort==='price_asc'){
            sortOption={price:1}
        }
        if(data.sort==='price_desc'){
            sortOption= {price:-1}
        }
    }
    
    if(data.search){
        const regex = data.search.split(/\s+/).map(splitedPart =>`.*${splitedPart}.*`);
        const searchRegex = new RegExp(regex.join('|'),'i')
        query['title'] = {$regex:searchRegex}
        
    }
    
    console.log("🚀 ~ query:", query)
    const properties = await Property.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).sort(sortOption).populate("hostId")
    console.log("🚀 ~ getAllPropertyRepository ~ properties:", properties)
    
    if(!properties){
        throw new Error("Error in getting properties");
    }
    return properties
}