import { IProperty } from "@/domain/entities/propertyEntity";
import { Property } from "../Models/property";

export const createPropertyRepository =async(data:IProperty):Promise<IProperty | null>=>{
    const property = await Property.create(data);
    if(!property){
        throw new Error("Error saving Property");
        
    }
    return property;
}